const { ValidationError } = require('express-validation');
const httpStatus = require('http-status');
const logger = require('../config/logger');

/**
 *Class representing an API error.
 *@param {string} message - Error message.
 *@param {number} statusCode - HTTP status code of error.
 *@param {boolean} isOperational - Whether the stack should be visible or not. True if not visible.
 */
class ApiError extends Error {
	constructor(statusCode, message, isOperational = true, stack) {
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
	let convertedError = err;
	if (err instanceof ValidationError) {
		convertedError = new ApiError(err.statusCode, 'Validation Error');
	} else if (!(err instanceof ApiError)) {
		// unexpected error, log error
		convertedError = new ApiError(err.status, err.message, false, err.stack);
	}

	return errorHandler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 */
const notFound = (req, res, next) => {
	const err = new ApiError(httpStatus.NOT_FOUND, 'Not found');
	return errorHandler(err, req, res);
};

module.exports = {
	ApiError,
	errorHandler,
	notFound,
	converter,
};
