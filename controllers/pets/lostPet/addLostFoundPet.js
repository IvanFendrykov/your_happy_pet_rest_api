const LostFound = require("../../../models/pets/lostFoundPet");
const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const cloudinary = require("../../../servis/cloudinary");

const addlostFoundPet = ctrlWrapper(async (req, res) => {
  const { path: tempUpload } = req.file;

  const resultImg = await cloudinary.uploader.upload(tempUpload);
  const image = resultImg.url;
  req.body.image = image;

  const response = await LostFound.create(req.body);
  res.status(201).json({
    code: 201,
    status: "created",
    data: {response},
  });
});

module.exports = {
  addlostFoundPet,
};
