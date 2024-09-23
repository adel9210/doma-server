const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {isValidObjectId} = require("mongoose");

// Middleware for validating product ID (optional, but recommended)
const validateProductId = (req, res, next) => {
    const productId  = req.params?.productId;
    if (!isValidObjectId(productId)) { // Assuming you have a function to validate ObjectID
        return res.status(400).json({ message: 'Invalid product ID format.' });
    }
    next();
};

// Specific routes first
router.get('/products/:productId', validateProductId, productController.getProductById); // Get product by ID
router.delete('/products/:productId', validateProductId, productController.deleteProduct); // Delete product by ID
router.put('/products/:productId', validateProductId, productController.updateProduct); // Update product by ID

// General routes
router.get('/products/', productController.getAllProducts); // Get all products
router.post('/products/', productController.createProduct); // Create a new product
router.post('/products/upload-images', productController.uploadImages); // Upload images
router.delete('/products/delete-image/:filename', productController.deleteFile); // Delete image by filename

// Error handling middleware (optional for centralized error management)
// router.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Internal Server Error' });
// });

module.exports = router;
