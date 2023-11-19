const fs = require("fs");
const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const path = require("path");
const InGoodHands = require("../../../models/pets/inGoodHands");

const addGoodHands = ctrlWrapper(async (req, res) => {
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

  const response = await InGoodHands.create(req.body);
  res.status(201).json({
    code: 201,
    status: "created",
    data: response,
  });
});

module.exports = { addGoodHands };
