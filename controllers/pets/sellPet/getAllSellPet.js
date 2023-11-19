const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const SellPet = require("../../../models/pets/sellPet");


const getAllSellPet = ctrlWrapper(async (req, res) => {
  const response = await SellPet.find();
  res.status(200).json({
    code: 200,
    status: "finded",
    data: response,
  });
});

module.exports = {
    getAllSellPet,
};
