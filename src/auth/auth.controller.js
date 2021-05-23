const httpStatus = require('http-status');
const authService = require('./auth.service');
const userService = require('../user/user.service');
const tokenService = require('../token/token.service');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	const tokens = await tokenService.generateAuthTokens(user);
	res.status(httpStatus.CREATED).json({ user, tokens });
});

const login = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const user = await authService.loginWithEmailAndPassword(email, password);
	const tokens = await tokenService.generateAuthTokens(user);
	res.json({ user, tokens });
});

module.exports = {
	register,
	login,
};
