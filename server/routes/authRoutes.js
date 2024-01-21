const express = require('express');
const router = express.Router();
// const authController = require('../controllers/authController');
const { signup, login, profile } = require('../controllers/authController');

// Route for user signup
router.post('/signup', signup);
router.post('/login', login);
router.get("/profile", profile)



module.exports = router;
