const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const SellPet = require("../../../models/pets/sellPet");




const getAllSellPet = ctrlWrapper(async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 

  const options = {
    page: page,
    limit: limit,
  };

  const response = await SellPet.paginate({}, options);

  res.status(200).json({
    code: 200,
    status: "finded",
    data: response,
  });
});

module.exports = {
  getAllSellPet,
};
