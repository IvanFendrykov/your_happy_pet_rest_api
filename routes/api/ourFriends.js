const express = require('express');

const ctrl = require('../../controllers/ourFriends');

const router = express.Router();

router.get('/', ctrl.getAll);

module.exports = router