require('dotenv').config();

module.exports = {
	port: process.env.PORT || 4000,
	mongoose: {
		options: {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		uri: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
	},
	env: process.env.NODE_ENV,
};
