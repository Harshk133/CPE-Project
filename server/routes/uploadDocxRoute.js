
const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const documentController = require('../controllers/docxController');
const upload = require('../middlewares/upload');


router.post('/upload-document', upload.single('document'), documentController.uploadDocument);
router.post('/submit-form', documentController.submitForm);

router.post('/upload', upload.single('file'), documentController.uploadFile);
router.get('/files', documentController.getFiles);

module.exports = router;

