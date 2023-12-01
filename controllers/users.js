const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const cloudinary = require("../servis/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { profile } = require("console");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    userId: newUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(newUser._id, { token }, { new: true });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw HttpError(401, "Invalid credentials");
  }

  const payload = {
    userId: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token }, { new: true });
  res.status(200).json({
    username: user.username,
    token,
    profilePic: user.profilePic,
    favoriteNoties: user.favoriteNoties,
  });
};

const getCurrentUser = async (req, res) => {
  res.json({
    username: req.user.username,
    email: req.user.email,
    phone: req.user.phone,
    birthDay: req.user.birthDay,
    city: req.user.city,
    profilePic: req.user.profilePic,
    freshRegistred: req.user.freshRegistred,
  });
};

const updateUser = async (req, res) => {
  const { username, email, phone, birthDay, city, freshRegistred } = req.body;
  const payload = {
    username,
    email,
    phone,
    birthDay,
    city,
    freshRegistred,
  };
  if (req.file) {
    const { path: tempUpload } = req.file;
    const resultImg = await cloudinary.uploader.upload(tempUpload);
    payload.profilePic = resultImg.url;
  }
  const response = await User.findByIdAndUpdate(req.user._id, payload, {
    new: true,
  });
  console.log(response.username);
  res.json({
    username: response.username,
    email: response.email,
    city: response.city,
    phone: response.phone,
    birthday: response.birthday,
    profilePic: response.profilePic,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "No Content",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
};
