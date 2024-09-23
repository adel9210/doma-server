const Product = require("../models/Product");
// const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
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

// // Configure Cloudinary
cloudinary.config({
  cloud_name: 'dzau808tk',
  api_key: '475953758675764',
  api_secret: 'Sdq1SfomO9B0t283aF7QlZPO3i4' // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // The name of the folder in your Cloudinary account
  },
});

const upload = multer({ storage: storage, limits: {files: 6, fileSize: 5 * 1024 * 1024} });


// Upload images

exports.uploadImages = async (req, res) => {
    upload.array('images', 6)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
        } else if (err) {
        return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Images uploaded successfully', files: req.files });
    });
}

// Delete image from cloudinary
exports.deleteImage = async (req, res) => {
  const { filename } = req.params;
  console.log(filename);
  try {
    await cloudinary.uploader.destroy(filename);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
    // delete product images from cloudinary
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    const imageIds = product.image.map((img) => img.filename);
    await cloudinary.api.delete_resources(imageIds);

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
