const mongoose = require("mongoose");
const mongooseURI = "mongodb+srv://nikhil_namade:nikhilnamade1934@portfolio-g.ln3ab.mongodb.net/";
require("dotenv").config();
const coonectTomongo = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("connect to mongo");
};
module.exports = coonectTomongo;
