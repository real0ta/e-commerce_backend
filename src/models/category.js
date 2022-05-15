const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
     }
}, {
  toJSON: { virtuals: true },
 toObject: { virtuals: true }
});

CategorySchema.virtual('products', {
  ref: "Product",
  localField: "_id",
  foreignField: "category"
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
