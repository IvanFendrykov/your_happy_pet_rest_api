const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const MyPet = require("../../../models/pets/myPet");
const cloudinary = require("../../../servis/cloudinary");

const addMyPet = ctrlWrapper(async (req, res) => {
  // const { _id: owner } = req.user;

  const { path: tempUpload } = req.file;

  const resultImg = await cloudinary.uploader.upload(tempUpload);
  const image = resultImg.url;
  req.body.image = image;

  const response = await MyPet.create(req.body);
  // const response = await MyPet.create({ ...req.body, owner });
  res.status(201).json({
    code: 201,
    status: "created",
    data: response,
  });
});

module.exports = {
  addMyPet,
};
