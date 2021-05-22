const express = require('express');
const { validate } = require('../../utils/validate');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../../user/user.validation');
const controller = require('../../user/user.controller');

const router = express.Router();

router.get('/', validate(getUsers), controller.getUsers);
router.post('/', validate(createUser), controller.createUser);
router.get('/:id', validate(getUser), controller.getUser);
router.put('/:id', validate(updateUser), controller.updateUser);
router.delete('/:id', validate(deleteUser), controller.deleteUser);

module.exports = router;
