const mongoose = require("mongoose");
const validator = require("validator");
const bycrpt = require("bcryptjs");
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

userSchema.pre("save", async function (req, res, next) {
	const user = this;
	try {
		// const hash = bycript.hashSync(req.body.password , 8);
		user.password = await bycrpt.hash(user.password, 8);
		next();
	} catch (e) {
		next(e);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
