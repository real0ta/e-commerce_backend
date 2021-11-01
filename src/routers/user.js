const express = require("express");
const User = require('../models/user')
const router = new express.Router();



router.post("/signup", async (req, res) => {
	const user = new User(req.body);
	const foundUser = await User.findOne({email: req.body.email})
	if ( foundUser ) {
		console.log(foundUser)
		return res.status(400).send(req.body.email)
	}


	try {
		await user.save();
		res.status(201).send({ user });
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
