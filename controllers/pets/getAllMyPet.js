const ctrlWrapper = require("../../helpers/ctrlWrapper");
const myPet = require("../../models/pets/myPet");

const getAllMyPet = ctrlWrapper(async (req, res) => {
  const response = await myPet.find();
  res.status(200).json({
    code: 200,
    status: "finded",
    data: response,
  });
});

module.exports = {
  getAllMyPet,
};
