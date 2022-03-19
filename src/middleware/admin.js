const admin = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else {
    res.status(401).send({ msg: "Access denied" });
  }
};

module.exports = admin;
