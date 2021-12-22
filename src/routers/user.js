const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.post("/register", async (req, res) => {
  const user = new User(req.body)
  console.log(user)
  try {

    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(402).send("error");
  }
});


router.post("/login", async (req, res) => {
  const user = await User.findAndCompareUser(
    req.body.email,
    req.body.password
  );
  if (!user) {
    return res.status(404).send();
  }
  res.status(201).send({ user });
});


module.exports = router;
