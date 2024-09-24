const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require("../middleware/authMiddleware");

// Specific routes first
router.post('/', authenticateToken, categoryController.addCategory);
router.delete('/:id', authenticateToken, categoryController.removeCategory);
router.get('/', categoryController.getCategories);


module.exports = router
