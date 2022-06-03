const express = require("express");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const checkoutRouter = require("./routers/checkout");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db/mongoose");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/checkout", checkoutRouter);
app.use(express.static("images"));

module.exports = app;
