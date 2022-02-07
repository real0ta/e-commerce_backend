const mongoose = require('mongoose');
const { Schema } = mongoose

const ProductSchema = new Schema({
    name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
      type: String,
      required:true,
  },
  price: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
