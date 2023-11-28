const express = require("express");
const upload = require("../../middlewares/uploadMyPet");

const { addMyPet, getAllMyPet, delMyPet } = require("../../controllers/myPet");

const isValidId = require("../../middlewares/isValidId");
const { authenticateUser } = require("../../middlewares/auth");
const router = express.Router();

router.post("/", authenticateUser, upload.single("image"), addMyPet);
router.get("/", authenticateUser, getAllMyPet);
router.delete("/:petId", authenticateUser, isValidId, delMyPet);

module.exports = router;
