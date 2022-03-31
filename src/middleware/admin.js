const admin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).send({ msg: "Access denied" });
  }
};

module.exports = admin;
