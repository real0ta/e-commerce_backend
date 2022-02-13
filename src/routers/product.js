const express = require("express");
const Product = require("../models/product");

// Middlewares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = new express.Router();

router.post("/create", auth, admin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send({ product });
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).send({ products });
  } catch (err) {
    res.status(404).send({ err });
  }
});

// Get product by id
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne(_id);

    if (!product) {
      res.status(404).send();
    }
    res.send(product);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id", auth, admin, (req, res) => {
  try {
    const product = Product.findOneAndDelete({ _id: req.params.id });
    res.status(201).send();
  } catch (er) {
    res.status(400).send();
  }
});

module.exports = router;
