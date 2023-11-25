const express = require("express");

const { getAllNews } = require("../../controllers/news");

const router = express.Router();

router.post("/", addNotice);

router.get("/:noticeId", getNoticesById);

router.get("/", getNoticesByQuery);

router.delete("/:noticeId", deleteNoticeById);

module.exports = router;
