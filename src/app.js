const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const bodyParser = require("body-parser");
require("./db/mongoose");

const app = express();

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.use(express.json());
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use(express.static("images"));

module.exports = app;
