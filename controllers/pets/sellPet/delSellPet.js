const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const SellPet = require("../../../models/pets/sellPet");

const delSellPet = ctrlWrapper(async (req, res) => {
  const { petId } = req.params;
  await SellPet.findByIdAndDelete(petId);
  res.status(200).json({
    code: 204,
    status: "Delete success",
  });
});

module.exports = {
  delSellPet,
};
