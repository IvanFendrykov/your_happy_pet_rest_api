const ctrlWrapper = require('../helpers/ctrlWrapper');
const News = require("../models/news");

const getAllNews = ctrlWrapper(async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const skip = (page - 1) * limit;
    const response = await News.find({}, "", { skip, limit});
    res.status(200).json({
        status: 200,
        statusText: "success",
        data: {response}
    });
})

module.exports = {
    getAllNews
}