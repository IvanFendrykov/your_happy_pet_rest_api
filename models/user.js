const {Schema, model} = require("mongoose");
const Joi = require('joi');
const { handleMongooseError } = require("../helpers");

 const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    username: {
      type: String,
      required: [true, 'Set name for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Set password for user'],
    },
    // token: {
    //   type: String,
    //   default: ""
    // }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerShema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(8).required(),
 });


const schemas = {
    registerShema,
};

const User = model("user", userSchema);

module.exports = {
    User, 
    schemas,
};

