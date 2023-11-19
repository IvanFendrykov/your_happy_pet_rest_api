const express = require("express");
const upload = require("../../../middlewares/uploadMyPet");


const { addGoodHands } = require("../../../controllers/pets/goodHangs/addGoodHands");
const { getGoodHands } = require("../../../controllers/pets/goodhangs/getGoodHands");
const { delGoodHands } = require("../../../controllers/pets/goodhangs/delGoodHands");

const isValidId = require("../../../middlewares/isValidId");

const router = express.Router();

router.post("/", upload.single("image"), addGoodHands);
router.get("/", getGoodHands);
router.delete("/:petId",isValidId, delGoodHands);

module.exports = router;
