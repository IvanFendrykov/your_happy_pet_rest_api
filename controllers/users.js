const {User} = require('../models/user');
const {ctrlWrapper, HttpError} = require('../helpers');

const bcrypt = require('bcrypt');

require("dotenv").config();

const register = async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email already in use");
    };
    
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});
    
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    });

};

module.exports = {
    register: ctrlWrapper(register),
    
};
