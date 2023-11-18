const express = require("express");
const { addMyPet } = require("../../controllers/pets/addMyPet");
const { getAllMyPet } = require("../../controllers/pets/getAllMyPet");
const { delMyPet } = require("../../controllers/pets/delMyPet");
const upload = require("../../middlewares/uploadMyPet");
const router = express.Router();

router.post("/",upload.single('image'), addMyPet);

router.get("/", getAllMyPet);
router.delete("/:petId", delMyPet);
module.exports = router;
