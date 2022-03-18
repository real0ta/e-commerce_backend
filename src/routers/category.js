const express = require("express");
const Category = require("../models/category");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = new express.Router();

router.post("/", auth, admin, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    console.log(category);
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
    res.status(400).send({ err });
  }
});

router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
    });

    if (!category) {
      res.status(404).send();
    }

    res.send(category);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
