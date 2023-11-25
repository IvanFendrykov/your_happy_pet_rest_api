const express = require('express');

const {getAllNews, getNewsByRequest} = require("../../controllers/news");

const router = express.Router();

router.get('/', getAllNews);

router.get('/search/:key', getNewsByRequest)

module.exports = router