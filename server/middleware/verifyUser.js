const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.verifyUser = async (req, res, next) => {
  let token;
  try {
    console.log(req.headers.authorization);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(404);
        throw new Error("User not found");
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
