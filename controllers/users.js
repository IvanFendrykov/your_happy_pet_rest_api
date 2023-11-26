const { User } = require('../models/user');
const { ctrlWrapper, HttpError } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email already in use");
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    
    res.status(201).json({
        username: newUser.name,
        email: newUser.email,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw HttpError(401, "Invalid credentials");
    }

    const payload = {
        userId: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ username: user.username, token });
};



const getCurrentUser = async (req, res) => {
  const { user_id, username, email, token, password } = req.body;

  res.json({ user_id, username, email, token, password});
};


const logout = async (req, res) => {
    const { _id } = req.body
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "No Content"
    })
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrentUser: ctrlWrapper(getCurrentUser), 
    logout: ctrlWrapper(logout),
};