const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const noticesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    noticeType: {
      type: String,
      enum: ["sell", "lost-found", "in-good-hands"],
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    petType: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    noticeOwner: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

noticesSchema.post("save", handleMongooseError);

const Notices = model("news", noticesSchema);

module.exports = Notices;
