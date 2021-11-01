const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validate(email) {
			if (!validator.isEmail(email)) {
				throw new Error("Email is not valid!");
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate(pass) {
			if (
				!validator.isStrongPassword(pass, {
					minUppercase: 0,
					minSymbols: 0,
				})
			) {
				throw new Error("Password is not strong enought!");
			}
		},
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
