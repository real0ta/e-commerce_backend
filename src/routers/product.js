const express = require('express');
const Product = require('../models/product');

const router = new express.Router();


router.post('/add', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send({product});
});

router.get('/', async  (req,res) => {
    const products = await Product.find();
    res.status(201).send({products});
});

module.exports = router;
