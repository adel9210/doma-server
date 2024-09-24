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
  category: [String],
  image: [{
    path: String,
    filename: String
  }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
