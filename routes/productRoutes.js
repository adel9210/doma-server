const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes
router.get('/', productController.getAllProducts);
router.post('/upload-images', productController.uploadImages);
router.delete('/delete-image/:filename', productController.deleteFile);

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
