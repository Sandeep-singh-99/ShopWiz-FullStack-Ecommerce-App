const jwt = require("jsonwebtoken");
const Auth = require("../models/auth-model");

// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.accesstoken;
//     console.log("Received token:", token);

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message); 
//     return res.status(402).json({ message: "Unauthorized Access" });
//   }
// };

// module.exports = verifyToken;


const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized -Invalid token" });
    }

    const user = await Auth.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized -User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = verifyToken;