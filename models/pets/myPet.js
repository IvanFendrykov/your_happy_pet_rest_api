const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const myPetSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the name."],
    minlength: 2,
    maxlength: 20,
  },
  birthDay: {
    type: Date,
    required: true,
    match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
  },

  typeOfPet: {
    type: String,
    required: [true, "Please provide the type of pet."],
    minlength: 2,
    maxlength: 20,
  },
  image: {
    type: String,
    required: [true, "Please provide the image URL."],
  },
  comments: {
    type: String,
    required: [true, "Please provide comments."],
    minlength: 3,
    maxlength: 499,
  },
});

myPetSchema.plugin(mongoosePaginate);
const MyPet = model("pet", myPetSchema);

module.exports = MyPet;
