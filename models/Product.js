const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  fullDescription: String,
  shortDescription: String,
  isNewProduct: Boolean,
  stock: Number,
  discount: Number,
  rating: Number,
  image: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
