const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const InGoodHands = require("../../../models/pets/inGoodHands");

const delGoodHands = ctrlWrapper(async (req, res) => {
  const { petId } = req.params;
  await InGoodHands.findByIdAndDelete(petId);
  res.status(200).json({
    code: 204,
    status: "Delete success",
  });
});

module.exports = {
  delGoodHands,

};
