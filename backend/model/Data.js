const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dataschems = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  Skills: [String],
 project: [{ title: String, description: String, Projectlink: String }],
//  project: {
//   type: Array,
//   required: true, // or adjust as needed
// },
  image: {
    type: String,
  },
  resume: {
    type: String,
  },
  LinkedinURL: {
    type: String,
    required: true,
  },
  Domain: {
    type: String,
    required: true
  },
  GithubURL: {
    type: String,
    required: true,
  },
  aboutyou: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model("Data", Dataschems);
