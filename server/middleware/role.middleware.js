const Auth = require("../models/auth-model");

const authorizesRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await Auth.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: You do not have permission to perform this action." });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { authorizesRoles };