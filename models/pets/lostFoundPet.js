const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LostFoundPetSchema = new Schema({
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
    match:  /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
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
  comments: {
    type: String,
    required: [true, "Please provide comments."],
    minlength: 3,
    maxlength: 499,
  },
});
LostFoundPetSchema.plugin(mongoosePaginate);
const LostFound = model("lost/foundPets", LostFoundPetSchema);

module.exports = LostFound;





