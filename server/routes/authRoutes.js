const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user signup
router.post('/signup', authController.signup);

module.exports = router;
