const express = require("express");
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const bodyParser = require("body-parser");
require("./db/mongoose");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use(express.static("images"));

module.exports = app;
