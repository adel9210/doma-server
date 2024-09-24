const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const  authenticateToken  = require('../middleware/authMiddleware');

// Specific routes first
router.get('/:id', productController.getProductById); // Get product by ID
router.delete('/:id', authenticateToken, productController.deleteProduct); // Delete product by ID
router.put('/:id', authenticateToken, productController.updateProduct); // Update product by ID

// General routes
router.get('/', productController.getAllProducts); // Get all products
router.post('/', authenticateToken, productController.createProduct); // Create a new product
router.post('/upload-images', authenticateToken, productController.uploadImages); // Upload images
router.delete('/delete-image/:filename', authenticateToken, productController.deleteImage); // Delete image by filename

module.exports = router;
