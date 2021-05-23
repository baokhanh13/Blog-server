/* eslint-disable node/no-unpublished-require */
const { ValidationError } = require('express-validation');
const { BAD_REQUEST } = require('http-status');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const { ApiError, converter } = require('../../../src/utils/ApiError');

describe('Error middlewares', () => {
	describe('Error converter', () => {
		test('should return the same ApiError object it was called with', () => {
			const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error');
			const next = jest.fn();

			converter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
			expect(next).toHaveBeenCalledWith(error);
		});
		test('should convert an error to ApiError and preserve it status and message', () => {
			const error = new Error('Any error');
			error.statusCode = httpStatus.BAD_REQUEST;
			const next = jest.fn();
			converter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
			expect(next).toHaveBeenCalledWith(expect.any(ApiError));
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: error.statusCode,
					message: error.message,
					isOperational: false,
				})
			);
		});

		// test for circleci
		test('should 1 + 1 equals 2', () => {
			expect(1 + 1).toBe(3);
		});

		test('should convert an error without status to ApiError with status 500', () => {
			const error = new Error('Any error');
			const next = jest.fn();
			converter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
			expect(next).toHaveBeenCalledWith(expect.any(ApiError));
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: httpStatus.INTERNAL_SERVER_ERROR,
					message: error.message,
					isOperational: false,
				})
			);
		});

		test('should convert an error without message to ApiError with default message of that error status', () => {
			const error = new Error();
			error.statusCode = BAD_REQUEST;
			const next = jest.fn();
			converter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
			expect(next).toHaveBeenCalledWith(expect.any(ApiError));
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: error.statusCode,
					message: httpStatus[error.statusCode],
					isOperational: false,
				})
			);
		});

		test('should convert Validation error with status 400 and messages map by details', () => {
			const errors = {
				body: [
					{
						message: '"password" is not allowed to be empty',
						path: ['password'],
						type: 'string.empty',
						context: {
							label: 'password',
							value: '',
							key: 'password',
						},
					},
				],
			};
			const options = { error: 'Invalid Request', statusCode: 400 };
			const error = new ValidationError(errors, options);
			error.details = [
				{ accesstoken: '"accesstoken" is not allowed to be empty' },
				{ password: '"password" is not allowed to be empty' },
			];
			const next = jest.fn();
			converter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
			expect(next).toHaveBeenCalledWith(expect.any(ApiError));
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: httpStatus.BAD_REQUEST,
					message: '"accesstoken" is not allowed to be empty,"password" is not allowed to be empty',
				})
			);
		});

		test('should convert any error with status 500 and its message', () => {
			const error = {};
			const next = jest.fn();
			converter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
			expect(next).toHaveBeenCalledWith(expect.any(ApiError));
			expect(next).toHaveBeenCalledWith(
				expect.objectContaining({
					statusCode: httpStatus.INTERNAL_SERVER_ERROR,
					message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
					isOperational: false,
				})
			);
		});
	});
});
