const express = require("express");
const upload = require("../../../middlewares/uploadMyPet");

const { addlostFoundPet } = require("../../../controllers/pets/lostPet/addLostFoundPet");
const { getlostFoundPet } = require("../../../controllers/pets/lostPet/getlostFoundPet");
const { dellostFoundPet } = require("../../../controllers/pets/lostPet/dellostFoundPet");
const isValidId = require("../../../middlewares/isValidId");
const router = express.Router();

router.post("/", upload.single("image"), addlostFoundPet);
router.get("/", getlostFoundPet);
router.delete("/:petId",isValidId, dellostFoundPet);

module.exports = router;
