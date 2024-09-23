const Product = require("../models/Product");
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// Utility function to validate ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    fullDescription,
    shortDescription,
    isNewProduct,
    discount,
    rating,
    stock,
    image,
  } = req.body;

  if (!name || !price) {
    return res.status(400).json({ status: false, message: "All fields are required" });
  }

  try {
    const product = new Product({
      name,
      price,
      fullDescription,
      shortDescription,
      isNewProduct,
      discount,
      rating,
      stock,
      image,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware for file validation errors
const handleFileValidationError = (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  next();
};

// Middleware for checking total file size
const handleTotalFileSize = (req, res, next) => {
  if (!req.files) {
    return next();
  }

  const totalFileSize = req.files.reduce((total, file) => total + file.size, 0);
  if (totalFileSize > 6000000) { // 6 MB limit
    return res.status(400).json({ message: 'Total file size exceeds the 6 MB limit.' });
  }
  next();
};

// Upload images
exports.uploadImages = [
  upload.array('images'),
  handleFileValidationError,
  handleTotalFileSize,
  (req, res) => {
    console.log('Uploaded files:', req.files);
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
  }
];

// Delete a file
exports.deleteFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  // Validate product ID
  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;

  // Validate product ID
  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format.' });
  }

  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  // Validate product ID
  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format.' });
  }

  try {
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: `Product ${productId} deleted successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product.', error: error.message });
  }
};
