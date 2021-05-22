const httpStatus = require('http-status');
const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const UserService = require('./user.service');
const { ApiError } = require('../utils/ApiError');

const createUser = catchAsync(async (req, res) => {
	const user = await UserService.createUser(req.body);
	res.status(httpStatus.CREATED).json(user);
});

const getUsers = catchAsync(async (req, res) => {
	const filter = _.pick(req.query, ['name', 'role']);
	const options = _.pick(req.query, ['sortBy', 'limit', 'page']);
	const users = await UserService.queryUsers(filter, options);
	res.json(users);
});

const getUser = catchAsync(async (req, res) => {
	const user = await UserService.getUserById(req.params.id);
	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
	}
	res.json(user);
});

const updateUser = catchAsync(async (req, res) => {
	const user = await UserService.updateUserById(req.params.id, req.body);
	res.json(user);
});

const deleteUser = catchAsync(async (req, res) => {
	await UserService.deleteUserById(req.params.id);
	res.status(httpStatus.NO_CONTENT).json({});
});

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
