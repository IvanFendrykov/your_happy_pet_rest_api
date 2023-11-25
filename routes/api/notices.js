const express = require("express");

const {
  addNotice,
  getNoticesById,
  deleteNoticeById,
} = require("../../controllers/notices");
const { authMiddleware } = require("../../middlewares/auth");

const router = express.Router();

router.post("/", authMiddleware, addNotice);

router.get("/:noticeId", getNoticesById);

// router.get("/", getNoticesByQuery);

router.delete("/:noticeId", authMiddleware, deleteNoticeById);

module.exports = router;
