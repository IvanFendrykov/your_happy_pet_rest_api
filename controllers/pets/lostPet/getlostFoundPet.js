const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const LostFound = require("../../../models/pets/lostFoundPet");


const getlostFoundPet = ctrlWrapper(async (req, res) => {
  const response = await LostFound.find();
  res.status(200).json({
    code: 200,
    status: "finded",
    data: response,
  });
});

module.exports = {
    getlostFoundPet,
};
