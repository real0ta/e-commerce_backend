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

router.post(
  "/create",
  auth,
  admin,
  upload.single("photo"),
  async (req, res) => {
    try {
      const category = await Category.findOne({ name: req.body.category });
      if (!category) res.status(500).send();

      const product = new Product({
        ...req.body,
        category: category._id,
        photo: req.file.buffer,
      });
      await product.save();
      res.status(201).send({ product });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

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

router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    if (!product) res.status(500).send();
    res.status(201).send(product);
  } catch (er) {
    res.status(400).send();
  }
});

module.exports = router;
