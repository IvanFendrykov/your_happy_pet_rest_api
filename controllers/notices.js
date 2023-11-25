// const HttpErr = require('../helpers/');
const { ctrlWrapper } = require("../helpers");
const Notices = require("../models/notices");

const addNotice = async (req, res) => {
  const response = await Notices;
  res.json(response);
};

const getNoticesById = async (req, res) => {
  const response = await Notices;
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
