const fs = require("fs");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const myPet = require("../../models/pets/myPet");
const path = require("path");

const addMyPet = ctrlWrapper(async (req, res) => {
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

  
  const response = await myPet.create(req.body);
  res.status(201).json({
    code: 201,
    status: "created",
    data: response,
  });
});

module.exports = {
  addMyPet,
};
