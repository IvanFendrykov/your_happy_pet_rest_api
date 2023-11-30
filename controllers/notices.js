const ctrlWrapper = require("../helpers/ctrlWrapper");
const cloudinary = require("../servis/cloudinary");
const Notices = require("../models/notices");
const HttpError = require("../helpers/HttpError");
const { getPagination } = require("../helpers");
const fs = require("fs/promises");
const { User } = require("../models/user");

const addNoticesPet = ctrlWrapper(async (req, res) => {
  const { path: tempUpload } = req.file;
  const { _id: owner } = req.user;

  const { url: image } = await cloudinary.uploader.upload(tempUpload);

  await fs.unlink(tempUpload);

  const response = await Notices.create({ ...req.body, owner, image });
  res.status(201).json({
    code: 201,
    status: "created",
    data: { response },
  });
});

const getNotices = ctrlWrapper(async (req, res) => {
  const options = getPagination(req);
  const { page = 1, limit = 12, ...query } = req.query;

  if (query.age) {
    const now = new Date();
    const year = now.getFullYear();

    query.$or = [];

    if (query.age.includes("up1")) {
      const dateFrom = new Date();
      dateFrom.setFullYear(year - 1);
      query.$or.push({ birthDay: { $gte: dateFrom, $lte: now } });
    }
    if (query.age.includes("up2")) {
      const dateFrom = new Date();
      dateFrom.setFullYear(year - 2);
      query.$or.push({ birthDay: { $gte: dateFrom, $lte: now } });
    }
    if (query.age.includes("from2")) {
      const dateFrom = new Date();
      dateFrom.setFullYear(year - 2);
      query.$or.push({ birthDay: { $lt: dateFrom } });
    }
    delete query.age;
  }
  const response = await Notices.paginate(query, options);

  res.json({
    code: 200,
    status: "finded",
    data: response,
  });
});

const getBySearchQuery = ctrlWrapper(async (req, res) => {
  const { search } = req.query;
  const options = getPagination(req);

  const result = await Notices.paginate(
    { title: { $regex: search, $options: "i" } },

    options
  );
  res.json(result);
});

const toogleFavorite = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const { favoriteNoties, _id } = req.user;
  console.log(_id);
  const index = favoriteNoties.indexOf(id);

  if (index === -1) {
    favoriteNoties.push(id);
  } else {
    favoriteNoties.splice(index, 1);
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { favoriteNoties },
    { new: true }
  );
  console.log(user);
  res.json({ favoriteNoties: user.favoriteNoties });
});

const getMyNotices = ctrlWrapper(async (req, res) => {
  const options = getPagination(req);
  const { _id: owner } = req.user;
  const response = await Notices.paginate({ owner }, options);

  res.json({
    code: 200,
    status: "finded",
    data: response,
  });
});

const getFavoriteNotices = ctrlWrapper(async (req, res) => {
  const { _id: id } = req.user;
  const { favoriteNoties } = await User.findById(id).populate("favoriteNoties");

  res.status(200).json({
    code: 200,
    status: "finded",
    data: { favoriteNoties },
  });
});

const getPetById = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const result = await Notices.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

const delNotices = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 204,
    status: "Delete success",
  });
});

module.exports = {
  addNoticesPet,
  delNotices,
  getNotices,
  getPetById,
  getBySearchQuery,
  toogleFavorite,
  getFavoriteNotices,
  getMyNotices,
};
