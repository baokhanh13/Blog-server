const express = require('express');
const { validate } = require('../../utils/validate');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../../user/user.validation');
const controller = require('../../auth/auth.controller');

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
