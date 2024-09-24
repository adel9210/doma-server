const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require("../middleware/authMiddleware");

// Routes
router.get('/', authenticateToken, orderController.getOrders);
router.post('/', orderController.createOrder);
router.delete('/:id', authenticateToken, orderController.deleteOrder);


module.exports = router;
