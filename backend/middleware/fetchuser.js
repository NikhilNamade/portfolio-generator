const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisismyfirstreactjsproject";
fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(500).json({ error: "Authentication token not provided" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error while fetching user" }); // Return a JSON response
  
  }
};
module.exports = fetchUser;
