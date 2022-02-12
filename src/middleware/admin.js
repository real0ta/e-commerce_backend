const User = require("../models/user");

const admin = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else {
    res.status(401).send("Access denied");
  }
};

module.exports = admin;
