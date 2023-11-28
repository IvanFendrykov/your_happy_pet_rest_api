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

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticateUser, logout);
router.get("/current", authenticateUser, getCurrentUser);
router.patch("/current", authenticateUser, updateUser);

module.exports = router;
