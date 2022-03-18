const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send();
  } catch (e) {
    res.status(402).send("Registration failed");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findAndCompareUser(req.body.email, req.body.password);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  res
    .status(201)
    .send({ username: user.username, email: user.email, token: token });
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res
      .status(200)
      .send({ username: req.user.username, email: req.user.email });
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res
      .status(200)
      .send({ username: req.user.username, email: req.user.email });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
