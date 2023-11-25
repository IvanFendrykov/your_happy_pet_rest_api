// const HttpErr = require('../helpers/');
const { ctrlWrapper } = require("../helpers");
const Notices = require("../models/notices");

const addNotice = async (req, res) => {
  req.body.noticeOwner = req.user.username;
  const response = await Notices.create(req.body);
  res.json(response._id);
};

const getNoticesById = async (req, res) => {
  console.log(req.params);
  const response = await Notices.findById(req.params.noticeId);
  res.json(response);
};

const getNoticesByQuery = async (req, res) => {
  const response = await Notices;
  res.json(response);
};

const deleteNoticeById = async (req, res) => {
  const response = await Notices;
  res.json(response);
};

module.exports = {
  addNotice: ctrlWrapper(addNotice),
  getNoticesById: ctrlWrapper(getNoticesById),
  getNoticesByQuery: ctrlWrapper(getNoticesByQuery),
  deleteNoticeById: ctrlWrapper(deleteNoticeById),
};
