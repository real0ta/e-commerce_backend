const express = require("express");
const Category = require("../models/category");
const Product = require("../models/product");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = new express.Router();

router.post("/", auth, admin, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send({ category: category.name });
  } catch (err) {
    res.status(400).send({ err });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).send({ categories });
  } catch (err) {
    res.status(404).send({ err });
  }
});

router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
    });

    //if (!category) {
    //res.status(404).send();
    //    }

    res.status(200).send(category);
  } catch (err) {
    res.status(404).send({ msg: "Category not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) throw new Error("Category does not exist!");

    const products = await Product.find({ category: req.params.id });
    console.log(products);
    res.status(200).send(products);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
