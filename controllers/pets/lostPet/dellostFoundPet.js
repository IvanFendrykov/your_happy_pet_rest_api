const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const LostFound = require("../../../models/pets/lostFoundPet");

const dellostFoundPet = ctrlWrapper(async (req, res) => {
  const { petId } = req.params;
  await LostFound.findByIdAndDelete(petId);
  res.status(200).json({
    code: 204,
    status: "Delete success",
  });
});

module.exports = {
    dellostFoundPet,
};
