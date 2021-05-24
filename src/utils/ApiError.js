const { ValidationError } = require('express-validation');
const httpStatus = require('http-status');
const { TokenExpiredError } = require('jsonwebtoken');
const logger = require('../config/logger');

/**
 *Class representing an API error.
 *@param {string} message - Error message.
 *@param {number} statusCode - HTTP status code of error.
 *@param {boolean} isOperational - Whether the stack should be visible or not. True if not visible.
 *@param {string} stack - Stack of error
 */
class ApiError extends Error {
	constructor(statusCode, message, isOperational = true, stack = '') {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.isOperational = isOperational;
		this.stack = stack;
	}
}

/**
 * Error handler. Log stacktrace if isOperational = true
 */
/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
	const message = err.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	if (!err.isOperational) {
		logger.error(err.stack);
	}
	res.status(statusCode).json({
		status: statusCode,
		message,
	});
};

/**
 * If error is not an instanceOf APIError, convert it.
 */
const converter = (err, req, res, next) => {
	let error = err;
	if (err instanceof ValidationError) {
		const message = err.details
			.map((e) => Object.values(e))
			.reduce((acc, currentValue) => {
				return acc.concat(currentValue);
			}, [])
			.join(',');
		error = new ApiError(err.statusCode, message);
	} else if (err instanceof TokenExpiredError) {
		error = new ApiError(httpStatus.BAD_REQUEST, err.message);
	} else if (!(err instanceof ApiError)) {
		// unexpected error, log error
		const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
		const message = err.message || httpStatus[status];
		const stack = err.stack || '';
		error = new ApiError(status, message, false, stack);
	}
	next(error);
};

/**
 * Catch 404 and forward to error handler
 */
const notFound = (req, res, next) => {
	const err = new ApiError(httpStatus.NOT_FOUND, 'Not found');
	next(err);
};

module.exports = {
	ApiError,
	errorHandler,
	notFound,
	converter,
};
