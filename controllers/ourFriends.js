// const HttpErr = require('../helpers/');
const { ctrlWrapper } = require('../helpers');
const ourFriend = require('../models/ourFriend')

const getAll = async (req, res) => {
    const response = await ourFriend.find()
    res.json(response);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
};