const express = require("express");
const router = express.Router();
const { registerSchema, loginSchema } = require("../../models/user");
const {
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
} = require("../../controllers/users");
const { authenticateUser } = require("../../middlewares/auth");
const { validateBody } = require("../../middlewares");
const upload = require("../../middlewares/uploadMyPet");

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticateUser, logout);
router.get("/current", authenticateUser, getCurrentUser);
router.patch("/current", authenticateUser, upload.single("image"), updateUser);

module.exports = router;
