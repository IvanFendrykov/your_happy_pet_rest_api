const express = require("express");
const upload = require("../../../middlewares/uploadMyPet");

const { addSellPet } = require("../../../controllers/pets/sellPet/addSellPet");
const { getAllSellPet } = require("../../../controllers/pets/sellPet/getAllSellPet");
const { delSellPet } = require("../../../controllers/pets/sellPet/delSellPet");
const isValidId = require("../../../middlewares/isValidId");
const router = express.Router();

router.post("/", upload.single("image"), addSellPet);
router.get("/", getAllSellPet);
router.delete("/:petId",isValidId, delSellPet);

module.exports = router;
