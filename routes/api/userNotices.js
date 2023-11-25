const express = require("express");
const {
  addNoticeToFavorite,
  getUserFavoriteNotices,
  deleteNoticeFromFavorite,
  getAllNotices,
} = require("../../controllers/users");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/auth");

router.post("/favoriteNotices/:noticeId", authMiddleware, addNoticeToFavorite);
router.get("/favoriteNotices", authMiddleware, getUserFavoriteNotices);
router.delete(
  "/favoriteNotices/:noticeId",
  authMiddleware,
  deleteNoticeFromFavorite
);
router.get("/notices", authMiddleware, getAllNotices);

module.exports = router;
