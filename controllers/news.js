const { ctrlWrapper } = require('../helpers');
const News = require("../models/news");

const getAllNews = async (req, res) => {
    const response = await News.find();
    res.status(200).json(response);
}

module.exports = {
    getAllNews: ctrlWrapper(getAllNews),
}