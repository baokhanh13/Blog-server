const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJson, paginate } = require('../utils/mongoose.plugin');
const roles = require('../config/roles');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Invalid email');
				}
			},
		},
		password: {
			type: String,
			rqeuired: true,
			trim: true,
			minLength: 3,
			private: true,
		},
		role: {
			type: String,
			enum: [roles.user, roles.admin],
			default: roles.user,
		},
	},
	{ timestamps: true }
);

userSchema.plugin(toJson);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email) {
	const user = await this.findOne({ email });
	return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
