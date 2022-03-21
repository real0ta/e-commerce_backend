const express = require("express");
const multer = require("multer");

// Models
const Product = require("../models/product");
const Category = require("../models/category");

// Middlewares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post("/", auth, admin, upload.single("photo"), async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.category });
    if (!category) res.status(500).send();

    const product = new Product({
      ...req.body,
      category: category,
      photo: req.file.buffer,
    });
    await product.save();
    res.status(201).send({ product });
  } catch (err) {
    res.status(400).send({ msg: "Could not create product" });
  }
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
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const category = await Category.findOne({ _id: product.category });
    product.category = category;
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ msg: "Could not find product" });
  }
});

//delete product by id
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    const category = await Category.findOne({ _id: product.category });

    product.category = category;
    res.status(200).send(product);
  } catch (er) {
    res.status(400).send({
      msg: "Could not delete product",
    });
  }
});

module.exports = router;
