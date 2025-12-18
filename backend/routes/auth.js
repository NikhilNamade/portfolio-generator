const express = require("express");
const User = require("../model/User");
const routes = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisismyfirstreactjsproject";
const fetchUser = require("../middleware/fetchuser");
let success = false;
//create new user /api/auth/createuser
routes.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success , error: error.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success,error:"User Already Exits"});
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success,authtoken });
    } catch (err) {
      res.status(400).json({success,error:"Server Error"});
    }
  }
);

//login /api/auth/login
routes.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({success,error: error.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success,error: "Invalid Credentails" });
      }
      const validUser = await bcrypt.compare(password, user.password);
      if (!validUser) {
        return res.status(400).json({ success,error: "Invalid Credentails" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (err) {
      res.status(400).json({success,error:"Server Error"});
    }
  }
);
//fetch data /api/auth/fetchUser
routes.post("/fetchUser",
 fetchUser, 
 async (req, res) => {
  
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  }
  catch (err) {
    res.status(400).send("Server  auth Error");
  }
 });
module.exports = routes;
