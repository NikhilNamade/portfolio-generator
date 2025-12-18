const express = require("express");
const Data = require("../model/Data");
const routes = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
require("dotenv");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Save file locally first
const storage = multer.memoryStorage(); // keeps files in memory

const upload = multer({ storage}); // max 10MB


routes.post(
  "/adddata",
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), // Handle multiple file uploads
  fetchUser,
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("LinkedinURL").isURL(),
    body("GithubURL").isURL(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      // Check if data with the same userId exists
      const existingData = await Data.find({ userId: req.user.id });

      if (existingData.length > 0) {
        // Delete all data with the same userId
        await Data.deleteMany({ userId: req.user.id });
      }

  
      const uploadToCloudinary = async (file, folder = "railwayconcession") => {
        // Validate file type
        if (file.fieldname === "image" && !file.mimetype.startsWith("image/")) {
            throw new Error("Profile image must be an image file.");
        }
        if (file.fieldname === "resume" && file.mimetype !== "application/pdf") {
            throw new Error("Resume must be a PDF file.");
        }
    
        // Set Cloudinary resource type
        const resourceType = file.fieldname === "resume" ? "raw" : "image";
    
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: resourceType,
                    use_filename: true,
                    unique_filename: false,
                    access_mode: "public",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }
            );
            stream.end(file.buffer); // send buffer to Cloudinary
        });
    };
    

      // Upload image and resume
      const profileimgUrl = await uploadToCloudinary(req.files["image"][0]);
      const resumeUrl = await uploadToCloudinary(req.files["resume"][0]);
      

      const {
        name,
        email,
        education,
        university,
        experience,
        Skills,
        project,
        LinkedinURL,
        GithubURL,
        Domain,
        aboutyou,
      } = req.body;
      const parsedProject =
        typeof project === "string" ? JSON.parse(project) : project;
        console.log("About You from req.body:", aboutyou);
      // Create new user data
      const userdata = new Data({
        name,
        email,
        education,
        university,
        experience,
        Skills,
        project: parsedProject,
        image: profileimgUrl,
        resume: resumeUrl,
        LinkedinURL,
        GithubURL,
        Domain,
        aboutyou,
        userId: req.user.id,
      });
      const savedata = await userdata.save();
      res.json({ success: true, savedata });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

//fetchuser data /api/data/fetch
routes.get("/fetch/:userId", async (req, res) => {
  try {
    //console.log("Fetching data for user:", req.user.id); // Add logging
    const user = await Data.findOne({
      userId: req.params.userId,
    }).sort({ date: -1 });

    if (!user) {
      return res.status(404).json({ success: false, error: "No data found" });
    }

    res.json({success:true, user});
  } catch (err) {
    console.error("Server error:", err); // Add error logging
    res.status(400).json({ success: false, error: "Server Error" });
  }
});

//fetch userid from authtoken
routes.get("/fetchid",fetchUser,(req,res)=>{
  try {
    const userId = req.user.id;
    res.json({userId})
  } catch (error) {
    console.log(error)
  }
})
module.exports = routes;
