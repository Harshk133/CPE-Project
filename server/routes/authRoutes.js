const express = require('express');
const router = express.Router();
const multer = require("multer");
const { signup, login } = require('../controllers/authController');

// Define storage strategy
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Ensure the "uploads" directory exists in your project structure
        cb(null, "uploads/images/");
    },
    filename: function(req, file, cb) {
        // Use a unique filename based on the current timestamp and the original filename
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route for user signup
router.post('/signup', upload.single("picture"), signup);
router.post('/login', login);

module.exports = router;
