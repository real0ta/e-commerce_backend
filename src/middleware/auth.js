const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authentication").replace("Bearer ", "");
    console.log(token);
    const verified = jwt.verify(token, process.env.JWT_KEY);
    console.log(verified);
    const user = await User.findOne({
      _id: verified._id,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (er) {
    res.status(401).send("Pleace authenticate");
  }
};

module.exports = auth;
