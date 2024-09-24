const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Specific routes first
router.post('/login', userController.login); // Login user


module.exports = router
