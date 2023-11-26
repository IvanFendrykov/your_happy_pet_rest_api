const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const { HttpError } = require("../helpers/HttpError");

const authenticateUser = async (req, res, next) => {
  const { authorization = " " } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(userId);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    console.log(req.user._id);

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
module.exports = {
  authenticateUser,
};
