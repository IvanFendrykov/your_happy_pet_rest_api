const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const myPet = require("../../../models/pets/myPet");

const delMyPet = ctrlWrapper(async (req, res) => {
  const { petId } = req.params;
   await myPet.findByIdAndDelete(petId);
  res.status(200).json({
    code: 204,
    status: "Delete success",
  });
});

module.exports = {
  delMyPet,
};
