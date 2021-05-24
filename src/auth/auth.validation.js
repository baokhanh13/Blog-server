const { Joi } = require('express-validation');

/**
 * Validation for route /users
 */
module.exports = {
	// POST /auth/register
	register: {
		body: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(3).required(),
			name: Joi.string().required(),
		}),
	},
	// POST/auth/login
	login: {
		body: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(3).required(),
		}),
	},
	// POST /auth/refresh
	refresh: {
		body: Joi.object({
			token: Joi.string().required(),
		}),
	},

	// POST /auth/logout
	logout: {
		body: Joi.object({
			token: Joi.string().required(),
		}),
	},
};
