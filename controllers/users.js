const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Notices = require("../models/notices");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    username: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.username },
      process.env.JWT_SECRET || "YOUR_ACTUAL_JWT_SECRET",
      { expiresIn: "3h" }
    );

    await User.findByIdAndUpdate(user._id, { lastRefreshToken: token });

    res.status(200).json({ token, name: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    req.user.lastRefreshToken = null;
    await req.user.save();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

// notices
const addNoticeToFavorite = async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  user.favoriteNotices.push(req.params.noticeId);
  await user.save();
  res.status(200).json("true");
};

const getUserFavoriteNotices = async (req, res) => {
  const response = await User.findOne({ username: req.user.username });
  res.status(200).json(response.favoriteNotices);
};

const deleteNoticeFromFavorite = async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  user.favoriteNotices = user.favoriteNotices.filter(
    (noticeId) => noticeId !== req.params.noticeId
  );
  const response = await user.save();
  res.status(200).json(response.favoriteNotices);
};

const getAllNotices = async (req, res) => {
  const response = await Notices.find({ noticeOwner: req.user.username });
  res.json(response);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  // notices
  addNoticeToFavorite: ctrlWrapper(addNoticeToFavorite),
  getUserFavoriteNotices: ctrlWrapper(getUserFavoriteNotices),
  deleteNoticeFromFavorite: ctrlWrapper(deleteNoticeFromFavorite),
  getAllNotices: ctrlWrapper(getAllNotices),
};
