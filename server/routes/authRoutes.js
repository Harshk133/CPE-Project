const express = require('express');
const router = express.Router();
// const authController = require('../controllers/authController');
const { signup, login, sendVerificationEmail, verifyEmail } = require('../controllers/authController');

// Route for user signup
router.post('/signup', signup);
router.post('/login', login);
router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
