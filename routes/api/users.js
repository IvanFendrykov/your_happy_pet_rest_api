const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema } = require('../../models/user');
const { register, login, logout } = require('../../controllers/users');
const { authMiddleware } = require('../../middlewares/auth');
const { validateBody } = require('../../middlewares');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', authMiddleware, logout);

module.exports = router;
