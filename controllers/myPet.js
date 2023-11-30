const { HttpError } = require("../helpers");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const MyPet = require("../models/myPet");
const cloudinary = require("../servis/cloudinary");

const addMyPet = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  const { path: tempUpload } = req.file;

  const resultImg = await cloudinary.uploader.upload(tempUpload);
  const image = resultImg.url;
  req.body.image = image;

  const response = await MyPet.create({
    ...req.body,
    owner,
    email: req.user.email,
    phone: req.user.phone,
  });

  res.status(201).json({
    code: 201,
    status: "created",
    data: response,
  });
});

const delMyPet = ctrlWrapper(async (req, res) => {
  const { petId } = req.params;
  await MyPet.findByIdAndDelete(petId);
  res.status(200).json({
    code: 204,
    status: "Delete success",
  });
});

const getAllMyPet = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const options = {
    page: page,
    limit: limit,
  };

  const response = await MyPet.paginate({ owner }, options);

  res.status(200).json({
    code: 200,
    status: "finded",
    data: { response },
  });
});

module.exports = {
  getAllMyPet,
  delMyPet,
  addMyPet,
};
