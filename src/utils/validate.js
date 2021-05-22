const { validate } = require('express-validation');

const configValidate = (schema) => validate(schema, { keyByField: true }, {});

const objectId = (value, helpers) => {
	if (!value.match(/^[0-9a-fA-F]{24}$/)) {
		return helpers.message('"{{#label}}" must be a valid mongo id');
	}
	return value;
};

module.exports = {
	validate: configValidate,
	objectId,
};
