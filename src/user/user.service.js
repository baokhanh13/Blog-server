const httpStatus = require('http-status');
const { ApiError } = require('../utils/ApiError');

const User = require('./user.model');

/**
 * Create a User
 * @param {Object} body -  userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
	if (await User.isEmailTaken(userBody.email)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
	}
	const user = await User.create(userBody);
	return user;
};

/**
 * Query users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {String} [options.sortBy] - Sort option in the format: sortField: (desc|asc)
 * @param {Number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {Number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
	const users = await User.paginate(filter, options);
	return users;
};

/**
 * Get user by id
 * @param {ObjectId} id - Id of user to be retrieved
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
	return User.findById(id);
};

/**
 * Get user by email
 * @param {String} email - Email of user to be retrieved
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
	return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} id - Id of user to be updated
 * @param {Object} userBody - Updated body
 * @returns {Promise<User>}
 */
const updateUserById = async (id, userBody) => {
	const user = await getUserById(id);
	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
	}
	if (userBody.email && (await User.isEmailTaken(userBody.email))) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
	}
	Object.assign(user, userBody);
	await user.save();
	return user;
};

/**
 * Delete user by id
 * @param {ObjectId} id - Id of user to be deleted
 * @returns {Promise<User>}
 */
const deleteUserById = async (id) => {
	const user = await getUserById(id);
	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
	}
	await user.remove();
	return user;
};

module.exports = {
	createUser,
	queryUsers,
	getUserById,
	getUserByEmail,
	updateUserById,
	deleteUserById,
};
