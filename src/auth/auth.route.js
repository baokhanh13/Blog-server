const express = require('express');
const { validate } = require('../utils/validate');
const controller = require('./auth.controller');
const { register, login, refresh, logout } = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(register), controller.register);
router.post('/login', validate(login), controller.login);
router.post('/refresh', validate(refresh), controller.refreshToken);
router.post('/logout', validate(logout), controller.logout);

module.exports = router;
