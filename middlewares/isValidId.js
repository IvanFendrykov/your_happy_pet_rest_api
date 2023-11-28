const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { petId } = req.params;
  if (!isValidObjectId(petId)) {
    next(HttpError(400, `${petId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
