const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./config/logger');
const { converter, notFound, errorHandler } = require('./utils/ApiError');

mongoose
	.connect(config.mongoose.uri, config.mongoose.options)
	.then(() => logger.info('Connected to Mongodb'))
	.catch((e) => logger.error(e));

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Hello world' }));

app.use('/api/v1', require('./routes/v1'));

app.use(converter);
app.use(notFound);

app.use((err, req, res, next) => errorHandler(err, req, res, next));

app.listen(config.port, () => console.log(`Server is listening at port ${config.port}`));
