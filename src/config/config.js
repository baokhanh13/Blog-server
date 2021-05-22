require('dotenv').config();

module.exports = {
	port: process.env.PORT || 4000,
	dbUri: process.env.MONGODB_URL,
	env: process.env.NODE_ENV,
};
