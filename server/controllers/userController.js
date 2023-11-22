const generateToken = require("../middleware/generateToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409);
      throw new Error("User already exists");
    }
    const user = await User.create({
      username,
      password,
      email,
    });
    const token = generateToken(user._id);
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user._id);
        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token,
        });
      } else {
        res.status(401);
        throw new Error("Invalid credentials");
      }
    }
  } catch (error) {
    next(error);
  }
};
