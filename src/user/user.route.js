const express = require('express');
const { validate } = require('../utils/validate');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('./user.validation');
const controller = require('./user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', validate(getUsers), auth(['manageUsers']), controller.getUsers);
router.post('/', validate(createUser), controller.createUser);
router.get('/:id', validate(getUser), controller.getUser);
router.put('/:id', validate(updateUser), controller.updateUser);
router.delete('/:id', validate(deleteUser), controller.deleteUser);

module.exports = router;
