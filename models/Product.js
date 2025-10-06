const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  youtubeURL: String,
  fullDescription: String,
  shortDescription: String,
  isNewProduct: Boolean,
  stock: Number,
  discount: Number,
  rating: Number,
  isVisible: {
    type: Boolean,
    default: true,
  },
  category: [String],
  image: [{
    path: String,
    filename: String
  }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
