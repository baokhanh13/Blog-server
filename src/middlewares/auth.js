const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { roleRights } = require('../config/roles');
const User = require('../user/user.model');
const { ApiError } = require('../utils/ApiError');

const auth = (requiredRights) => async (req, res, next) => {
	try {
		const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
		if (!token) {
			throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus[httpStatus.UNAUTHORIZED]);
		}
		const payload = jwt.verify(token, config.jwt.secret);
		const user = await User.findById(payload.sub);
		if (!user) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is invalid');
		}
		req.user = user;
		const userRights = roleRights.get(user.role);
		const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
		if (!hasRequiredRights && req.params.id !== user.id) {
			throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
		}
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = auth;
