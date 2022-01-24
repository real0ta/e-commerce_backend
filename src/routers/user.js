const express = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const auth = require('../middleware/auth')

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

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  res.status(201).send({ user });
});


router.post('/logout', auth, async (req, res) => {
 try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})



router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router;
