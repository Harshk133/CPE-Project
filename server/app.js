// Basic Module are requirer here..
const cors = require('cors');
const express = require('express');
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const PizZip = require('pizzip');
const bodyParser = require('body-parser');
const Docxtemplater = require('docxtemplater');
const officeParser = require('officeparser');

// Configuration to the dotenv!
require("dotenv").config();

// Routes are here..
const documentRoutes = require('./routes/uploadDocxRoute');
const authRoutes = require('./routes/authRoutes');

// App assigned to the express() function
const app = express();

// Port is defined here..
const port = 7000;

// All middlewares are used in this section..
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
app.use(cors());

// Router middleware!
app.use('/api/documents', documentRoutes);
app.use('/api/users', authRoutes); 

// Listening for a port for server!
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});