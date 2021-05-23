/* eslint-disable no-undef */
const mongoose = require('mongoose');
const config = require('../../src/config/config');

const setupTestDB = () => {
	beforeAll(async () => {
		await mongoose.connect(config.mongoose.uri, config.mongoose.options);
	});

	beforeEach(async () => {
		await Promise.all(
			Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany())
		);
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});
};

module.exports = setupTestDB;
