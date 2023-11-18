const { Schema, model } = require("mongoose");

const myPetSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  birthDay: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
  },
  typeOfPet: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  image: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 499,
  },
});

const myPet = model("pet", myPetSchema);

module.exports = myPet;
