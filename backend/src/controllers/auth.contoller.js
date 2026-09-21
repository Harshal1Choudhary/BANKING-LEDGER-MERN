const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");

/*
 * - user register controller
 * - POST /api/auth/register
 */
async function userRegisterController(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists with this email",
      status: "failed",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // fire the welcome email (don't block the response on it)
  emailService.sendRegistrationEmail(user.email, user.name);

  return res.status(201).json({
    user: { _id: user._id, email: user.email, name: user.name },
    token,
  });
}

/*
 * - user login controller
 * - POST /api/auth/login
 */
async function userLoginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      message: "Email or password is invalid",
    });
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Email or password is invalid",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token", token);

  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
};
