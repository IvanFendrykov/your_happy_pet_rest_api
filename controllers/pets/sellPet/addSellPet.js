const fs = require("fs");
const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const path = require("path");
const SellPet = require("../../../models/pets/sellPet");

const addSellPet = ctrlWrapper(async (req, res) => {
  console.log(req.file);
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

  
  const response = await SellPet.create(req.body);
  res.status(201).json({
    code: 201,
    status: "created",
    data: response,
  });
});

module.exports = {
  addSellPet,
};
