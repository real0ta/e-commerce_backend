const express = require("express");
const User = require('../models/user')
const router = new express.Router();

router.get("/signup", async (req, res) => {
	const user = new User({name: 'name', email: "example@mail.com"})
	await user.save()
	res.send({user})

});

module.exports = router;
