const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./config/config');
const logger = require('./config/logger');

mongoose
	.connect(config.dbUri, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => logger.info('Connected to Mongodb'))
	.catch(e => logger.error(e));

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Hello world ' }));

app.listen(config.port, () => console.log(`Server is listening at port ${config.port}`));
