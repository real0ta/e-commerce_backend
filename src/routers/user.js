const express = require("express");

const router = new express.Router();

router.get("/registration", (req, res) => {
	res.send("a");
});

module.exports = router;
