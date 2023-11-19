const fs = require("fs");
const path = require("path");
const LostFound = require("../../../models/pets/lostFoundPet");
const ctrlWrapper = require("../../../helpers/ctrlWrapper");

const addlostFoundPet = ctrlWrapper(async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  const resultPath = path.join(
    __dirname,
    "../",
    "../",
    "public",
    "image",
    originalname
  );

  await fs.renameSync(tempUpload, resultPath);

  const image = path.join("public", "image", originalname);

  req.body.image = image;

  const response = await LostFound.create(req.body);
  res.status(201).json({
    code: 201,
    status: "created",
    data: response,
  });
});

module.exports = {
  addlostFoundPet,
};
