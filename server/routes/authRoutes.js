const express = require('express');
const router = express.Router();
const authController = require('./authController');

// Route for user signup
router.post('/signup', authController.signup);

module.exports = router;
