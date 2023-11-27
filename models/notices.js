const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const notices = new Schema({
  category: {
    type: String,
    required: [true, "Choose a category"],
    enum: ["sell", "lostFound", "inGoodHands"],
  },
  name: {
    type: String,
    required: [true, "Please provide the name."],
    minlength: 2,
    maxlength: 20,
  },
  title: {
    type: String,
    required: [true, "Please provide the title."],
    minlength: 2,
    maxlength: 20,
  },
  birthDay: {
    type: Date,
    required: true,
  },
  typeOfPet: {
    type: String,
    required: [true, "Please provide the type of pet."],
    minlength: 2,
    maxlength: 20,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, 'Please specify the gender as "male" or "female".'],
  },
  image: {
    type: String,
    required: [true, "Please provide the image URL."],
  },
  location: {
    type: String,
    required: [true, "Please provide the location."],
  },
  price: {
    type: String,
    required: function () {
      return this.category === "sell";
    },
  },
  comments: {
    type: String,
    required: [true, "Please provide comments."],
    minlength: 3,
    maxlength: 499,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

notices.plugin(mongoosePaginate);

const Notices = model("noties", notices);

module.exports = Notices;
