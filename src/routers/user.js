const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user.id.toString(), role: user.role },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
};

router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send("Account registered");
          
  } catch (e) {
    res.status(404).send("Registration failed");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findAndCompareUser(req.body.email, req.body.password);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const token = jwt.sign(
    { _id: user._id.toString(), name: user.username },
    process.env.JWT_KEY
  );

  const accessToken = generateAccessToken(user);
  user.tokens = user.tokens.concat({ token });

  await user.save();
  res.status(201).send({
    username: user.username,
    email: user.email,
    refreshToken: token,
    accessToken: accessToken,
  });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = res.body.token;
  if (!refreshToken) res.send(400).send();

  const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
  const user = User.findOne({ _id: verified._id, "tokens.token": token });

  if (!user) res.status(401).json("error");
  const accessToken = generateAccessToken(user);
  res.status(200).send({ accessToken });
  a;
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
