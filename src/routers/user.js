const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.post("/signup", async (req, res) => {
	const user = new User(req.body);
	const foundUser = await User.findOne({ email: req.body.email });
	if (foundUser) {
		console.log(foundUser);
		return res.status(400).send(req.body.email);
	}

	try {
		await user.save();
		res.status(201).send({ user });
	} catch (e) {
		res.status(400).send(e);
	}
});


router.post('/login', async (req,res) => {
		const user = await User.findAndCompareUser(req.body.email, req.body.password)
		if(!user){
			return res.status(404).send()
		}
		res.send({user})


})


module.exports = router;
