const { Schema, model } = require("mongoose");

const myPetSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name.'],
    minlength: 2,
    maxlength: 20,
  },
  birthDay: {
    type: String,
    required: [true, 'Please provide the birth day in MM/DD/YYYY format.'],
    match: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
  },
  typeOfPet: {
    type: String,
    required: [true, 'Please provide the type of pet.'],
    minlength: 2,
    maxlength: 20,
  },
  image: {
    type: String,
    required: [true, 'Please provide the image URL.'],
  },
  comments: {
    type: String,
    required: [true, 'Please provide comments.'],
    minlength: 3,
    maxlength: 499,
  },
});

const MyPet = model("pet", myPetSchema);

module.exports = MyPet;
