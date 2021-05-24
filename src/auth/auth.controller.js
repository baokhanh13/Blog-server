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

const refreshToken = catchAsync(async (req, res) => {
	const { token } = req.body;
	const tokens = await authService.refreshAuth(token);
	res.json({ tokens });
});

const logout = catchAsync(async (req, res) => {
	const { token } = req.body;
	await authService.logout(token);
	res.json({ msg: 'Logout successfully' });
});

module.exports = {
	register,
	login,
	refreshToken,
	logout,
};
