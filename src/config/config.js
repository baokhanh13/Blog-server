require('dotenv').config();

module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT || 4000,
	mongoose: {
		options: {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		uri: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
	},
};
