const express = require("express");
const Product = require("../models/product");

const router = new express.Router();

router.post("/add", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send({ product });
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(201).send({ products });
});

router.delete("/remove", (req, res) => {
  try {
    const product = Product.findOneAndDelete({ _id: req.body.id });
    res.status(201).send();
  } catch (er) {
    res.status(400).send();
  }
});

module.exports = router;
