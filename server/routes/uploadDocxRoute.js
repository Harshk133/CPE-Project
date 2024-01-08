
const express = require('express');
const router = express.Router();


const documentController = require('../controllers/docxController');
const upload = require('../middlewares/upload');

router.post('/upload-document', upload.single('document'), documentController.uploadDocument);
router.post('/submit-form', documentController.submitForm);

module.exports = router;

