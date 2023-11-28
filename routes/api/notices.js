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



// router.post("/", authenticateUser, upload.single("image"), addNoticesPet) --- добавить животное
// router.get("/", getNotices); --- получить животных, так же добавленна филтрация по возвросту за неймами (up1, up2, from2)
// router.get("/search", getBySearchQuery); --- тут можно получить поиск по коткгории в поисковой строк :Запрос => https..../api/notices/search?categoty="sell"
// router.get("/favorite", authenticateUser, getFavoriteNotices); --- получить список животных которые понравились юзеру
// router.get("/:id", isValidId, getPetById); --- взять одного нотиса по ид
// router.delete("/:id", authenticateUser, isValidId, delNotices); --- удалиить нотиса

// router.patch("/:id/favorite", authenticateUser, isValidId, toogleFavorite); --- внимание! это роут который как и добовляет нотиса в любимые так и удаляет с любимых

// router.get("/my/adds", authenticateUser, getMyNotices);--- мною добавленные нотисы