
const ctrlWrapper = require("../../../helpers/ctrlWrapper");
const MyPet = require("../../../models/pets/myPet");

const getAllMyPet = ctrlWrapper(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const options = {
    page: page,
    limit: limit,
  };

  const response = await MyPet.paginate({}, options);

  res.status(200).json({
    code: 200,
    status: "finded",
    data: { response },
  });
});

module.exports = {
  getAllMyPet,
};
