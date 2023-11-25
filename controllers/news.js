const ctrlWrapper = require('../helpers/ctrlWrapper');
const News = require("../models/news");

// const getAllNews = ctrlWrapper(async (req, res) => {
//     // const { page = 1, limit = 6 } = req.query;
//     // const skip = (page - 1) * limit;
//     // {}, "", { skip, limit }
//     const response = await News.find();
//     const totalPageCount = Math.ceil(response.length / 6);
    
//     console.log(totalPageCount)

//     res.status(200).json(response);
// })

const getAllNews = ctrlWrapper(async (req, res) => {
    const { page = 1, limit = 6, } = req.query;
    const skip = (page - 1) * limit;

    // Получение общего количества документов в коллекции
    const totalDocumentsCount = await News.countDocuments({});

    // Расчет общего количества страниц
    const totalPageCount = Math.ceil(totalDocumentsCount / limit);

    // Получение данных для текущей страницы
    const response = await News.find({}, "", { skip, limit });

    res.status(200).json({response, totalPageCount});
});

const getNewsByRequest = ctrlWrapper(async (req, res) => {
    const { page = 1, limit = 6, } = req.query;
    const skip = (page - 1) * limit;

    const totalDocumentsCount = await News.countDocuments({
            "$or": [
                { title: { $regex: req.params.key } },
                { text: { $regex: req.params.key } }
            ]
    });

    const totalPageCount = Math.ceil(totalDocumentsCount / limit);
    
    console.log(totalPageCount)

    const response = await News.find(
        {
            "$or": [
                { title: { $regex: req.params.key } },
                { text: { $regex: req.params.key } }
            ]
        }
    , "" , {skip, limit})
    res.status(200).json({response, totalPageCount});
})

module.exports = {
    getAllNews,
    getNewsByRequest
}