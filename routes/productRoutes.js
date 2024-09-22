const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Specific routes first
router.get('/:id', productController.getProductById); // Get product by ID
// router.delete('/:id', productController.deleteProduct); // Delete product by ID
router.put('/:id', productController.updateProduct); // Update product by ID

// General routes
router.get('/', productController.getAllProducts); // Get all products
router.post('/', productController.createProduct); // Create a new product
router.delete('/', productController.deleteProduct); // Delete all products
router.post('/upload-images', productController.uploadImages); // Upload images
router.delete('/delete-image/:filename', productController.deleteFile); // Delete image by filename

module.exports = router;
