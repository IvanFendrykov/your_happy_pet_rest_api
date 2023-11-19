const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const cloudinary = require("../../../servis/cloudinary");
const SellPet = require("../../../models/pets/sellPet");

const addSellPet = ctrlWrapper(async (req, res) => {
  console.log(req.file);
  const { path: tempUpload } = req.file;

  const resultImg = await cloudinary.uploader.upload(tempUpload);
  const image = resultImg.url;
  req.body.image = image;

  const response = await SellPet.create(req.body);
  res.status(201).json({
    code: 201,
    status: "created",
    data: {response },
  });
});

module.exports = {
  addSellPet,
};
