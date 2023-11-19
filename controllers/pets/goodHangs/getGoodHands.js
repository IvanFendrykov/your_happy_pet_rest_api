const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const InGoodHands = require("../../../models/pets/inGoodHands");

const getGoodHands = ctrlWrapper(async (req, res) => {
  const response = await InGoodHands.findByIdAndDelete();
  res.status(200).json({
    code: 200,
    status: "finded",
    data: response,
  });
});

module.exports = {
  getGoodHands,
};
