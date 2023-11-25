const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middlewares/auth");

router.post("/favorites", authMiddleware, addToFavorite);
router.get("/favorites", authMiddleware, getUserFavorites);
router.delete("/favorites", authMiddleware, deleteFromFavorites);
router.get("/notices", authMiddleware, getAllNotices);

router.module.exports = router;
