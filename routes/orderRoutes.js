const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes
router.get('/orders/', orderController.getOrders);
router.post('/orders/', orderController.createOrder);
router.delete('/orders/:id', orderController.deleteOrder);


module.exports = router;
