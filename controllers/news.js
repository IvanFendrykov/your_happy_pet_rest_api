const ctrlWrapper = require('../helpers/ctrlWrapper');
const News = require("../models/news");

const getAllNews = ctrlWrapper(async (req, res) => {
    const response = await News.find();
    res.status(200).json({
        code: 200,
        status: "success",
        data: {response}
    });
})

module.exports = {
    getAllNews
}