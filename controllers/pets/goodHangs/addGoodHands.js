const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const InGoodHands = require("../../../models/pets/inGoodHands");
const cloudinary   = require("../../../servis/cloudinary");

const addGoodHands = ctrlWrapper(async (req, res) => {
  const { path: tempUpload } = req.file;

 

  const resultImg = await cloudinary.uploader.upload(tempUpload);
  const image = resultImg.url;
  req.body.image = image;

  const response = await InGoodHands.create(req.body);
  res.status(201).json({
    code: 201,
    status: "created",
    data: response,
  });
});

module.exports = { addGoodHands };
