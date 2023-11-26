const express = require("express");
const upload = require("../../../middlewares/uploadMyPet");

const { addMyPet } = require("../../../controllers/pets/myPet/addMyPet");
const { getAllMyPet } = require("../../../controllers/pets/myPet/getAllMyPet");
const { delMyPet } = require("../../../controllers/pets/myPet/delMyPet");
const isValidId = require("../../../middlewares/isValidId");
const router = express.Router();

router.post("/",  upload.single("image"), addMyPet);
router.get("/", getAllMyPet);
router.delete("/:petId", isValidId, delMyPet);

module.exports = router;
