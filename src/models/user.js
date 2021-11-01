const mongoose = require("mongoose");
const validator = require('validator')
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim:true,
	},
	email: {
		type: String,
		required:true,
		trim:true,
		validate: {
			validator(email){
				if(!validator.isEmail(email)){
					throw new Error('Email is not valid!')
				}
			}
		}
	}
})


const User = mongoose.model("User", userSchema)

module.exports = User;
