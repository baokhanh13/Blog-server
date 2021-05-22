const { Joi } = require('express-validation');
const roles = require('../config/roles');
const { objectId } = require('../utils/validate');

/**
 * Validation for route /users
 */
module.exports = {
	// POST /users
	createUser: {
		body: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(3).required(),
			name: Joi.string().required(),
			role: Joi.string().required().valid(roles.user, roles.admin),
		}),
	},
	// GET /users
	getUsers: {
		query: Joi.object({
			name: Joi.string(),
			role: Joi.string(),
			sortBy: Joi.string(),
			limit: Joi.number().integer(),
			page: Joi.number().integer(),
		}),
	},
	// GET /users/:id
	getUser: {
		params: Joi.object({
			id: Joi.string().custom(objectId),
		}),
	},
	// PUT /users/:id
	updateUser: {
		params: Joi.object({
			id: Joi.string().custom(objectId).required(),
		}),
		body: Joi.object({
			email: Joi.string().email(),
			password: Joi.string().min(3),
			name: Joi.string(),
		}).min(1),
	},
	// DELETE /users/:id
	deleteUser: {
		params: Joi.object({
			id: Joi.string().custom(objectId),
		}),
	},
};
