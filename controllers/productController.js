const Product = require("../models/Product");
 const upload = require('../config/multer');
const checkTotalSize = require('../config/fileSizeMiddleware');
const fs = require('fs');
const path = require('path');

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
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
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

// Upload images

// Middleware to handle file validation errors
const handleFileValidationError = (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  next();
};

// Middleware to check total file size
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



// Main upload function with error handling
exports.uploadImages = [
  // Handle file uploads
  upload.array('images'),

  // Handle file validation errors
  handleFileValidationError,

  // Check total file size
  handleTotalFileSize,

  // Final handler to send success response
  (req, res) => {
    console.log('files=======', req.files);
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
  }
];

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
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const {
    name,
    price,
    fullDescription,
    shortDescription,
    isNewProduct,
    discount,
    rating,
    stock,
  } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        fullDescription,
        shortDescription,
        isNewProduct,
        discount,
        rating,
        stock,
      },
      { new: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};



// Optional helper function to check if an ObjectId is valid
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id); // Check if it's a 24-character hex string
};


exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  // Check if the product ID is a valid format (optional)
  if (!isValidObjectId(productId)) {
    return res.status(400).json({ message: 'Invalid product ID format.' });
  }

  try {
    // Attempt to delete the product by ID
    const result = await Product.findByIdAndDelete(productId);

    // If no product was found, return a 404 error
    if (!result) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Successfully deleted
    res.status(200).json({ message: `Product ${productId} deleted successfully.` });
  } catch (error) {
    console.error(error);

    // Handle different types of errors
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID format.' });
    }

    // Generic server error
    res.status(500).json({ message: 'Error deleting product.' });
  }
};
