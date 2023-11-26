const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema } = require('../../models/user');
const { register, login,getCurrentUser, logout  } = require('../../controllers/users');
const { authenticateUser } = require('../../middlewares/auth');
const { validateBody } = require('../../middlewares');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', authenticateUser, logout);
router.get("/current", authenticateUser, getCurrentUser);

module.exports = router;
