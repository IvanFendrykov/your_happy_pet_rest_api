const express = require("express");
const upload = require("../../middlewares/uploadMyPet");
const {
  addNoticesPet,
  delNotices,
  getNotices,
  getPetById,
  getBySearchQuery,
  toogleFavorite,
  getFavoriteNotices,
  getMyNotices,
} = require("../../controllers/notices");
const { authenticateUser } = require("../../middlewares/auth");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.post("/", authenticateUser, upload.single("image"), addNoticesPet);
router.get("/", getNotices);
router.get("/search", getBySearchQuery);
router.get("/favorite", authenticateUser, getFavoriteNotices);
router.get("/:id", isValidId, getPetById);
router.delete("/:id", authenticateUser, isValidId, delNotices);
router.patch("/:id/favorite", authenticateUser, isValidId, toogleFavorite);
router.get("/my/adds", authenticateUser, getMyNotices);


module.exports = router;
