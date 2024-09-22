const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Middleware for validating product ID (optional, but recommended)
const validateProductId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) { // Assuming you have a function to validate ObjectID
        return res.status(400).json({ message: 'Invalid product ID format.' });
    }
    next();
};

// Specific routes first
router.get('/:id', validateProductId, productController.getProductById); // Get product by ID
router.delete('/:id', validateProductId, productController.deleteProduct); // Delete product by ID
router.put('/:id', validateProductId, productController.updateProduct); // Update product by ID

// General routes
router.get('/', productController.getAllProducts); // Get all products
router.post('/', productController.createProduct); // Create a new product
router.post('/upload-images', productController.uploadImages); // Upload images
router.delete('/delete-image/:filename', productController.deleteFile); // Delete image by filename

// Error handling middleware (optional for centralized error management)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
