const { Schema, model } = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { handleMongooseError } = require("../helpers");

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegExp,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Set password for user"],
    },

    token: {
      type: String,
    },

    phone: {
      type: String,
    },
    birthDay: {
      type: Date,
      match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    },
    city: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    favoriteNoties: [
      { type: Schema.Types.ObjectId, ref: "noties", default: "" },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { userId: user._id, email: user.email, name: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = model("User", userSchema);

module.exports = {
  User,
  registerSchema,
  loginSchema,
};
