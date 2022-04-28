const express = require("express");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const checkoutRouter = require("./routers/checkout");
const bodyParser = require("body-parser");
require("./db/mongoose");

const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.use(express.json());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/checkout", checkoutRouter);
app.use(express.static("images"));

module.exports = app;
