const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
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

  return res.status(201).json({
    user: { _id: user._id, email: user.email, name: user.name },
    token,
  });
}

module.exports = {
  userRegisterController,
};
