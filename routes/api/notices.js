const express = require("express");

const { addNotice, getNoticesById } = require("../../controllers/notices");
const { authMiddleware } = require("../../middlewares/auth");

const router = express.Router();

router.post("/", authMiddleware, addNotice);

router.get("/:noticeId", getNoticesById);

// router.get("/", getNoticesByQuery);

// router.delete("/:noticeId", deleteNoticeById);

module.exports = router;
