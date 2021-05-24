const express = require('express');

const router = express.Router();

router.use('/users', require('../../user/user.route'));
router.use('/auth', require('../../auth/auth.route'));

module.exports = router;
