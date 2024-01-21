
// Require modules
const fs = require("fs");
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const officeParser = require('officeparser');
const File = require("../models/File");


// Check for Is? there a document directory exists or not!
const tempDir = './documents';
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

const uploadDocument = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer;

    try {
        const tempFilePath = './documents/tempFile.docx';
        await fs.promises.writeFile(tempFilePath, fileBuffer);

        const data = await officeParser.parseOfficeAsync(fileBuffer);

        const extractAndConsolidatePlaceholders = (text) => {
            const regex = /\{([^}]+)\}/g;
            const matches = text.match(regex);

            if (!matches) {
                return [];
            }

            const uniquePlaceholders = new Set();

            matches.forEach((match) => {
                const placeholder = match.slice(1, -1);
                uniquePlaceholders.add(placeholder);
            });

            return Array.from(uniquePlaceholders);
        };

        const placeholders = extractAndConsolidatePlaceholders(data);

        console.log('Consolidated Placeholders:', placeholders, "and the file is", fileBuffer);

        res.status(200).json({ placeholders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error parsing the document.');
    }
};

const submitForm = async (req, res) => {
    const tempFilePath = './documents/tempFile.docx';

    try {
        const fileContent = await fs.promises.readFile(tempFilePath, { encoding: 'utf-8' });
        const templateFile = fs.readFileSync(tempFilePath, 'binary');
        const zip = new PizZip(templateFile);
        let outputDocument = new Docxtemplater(zip);

        const formData = req.body;
        outputDocument.setData(formData);

        try {
            outputDocument.render();
            let outputDocumentBuffer = outputDocument.getZip().generate({ type: 'nodebuffer' });

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="MugBit_Generated_Document.docx"`);

            res.send(outputDocumentBuffer);
        } catch (error) {
            console.error('Error filling out template:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).send('Error reading the file.');
    }
}

const uploadFile = async (req, res) => {
    try {
        const newFile = new File({
            name: req.file.originalname,
            data: req.file.buffer
        });
        await newFile.save();
        res.json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getFiles = async (req, res) => {
    try {
      const files = await File.find({});
      res.json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    uploadDocument,
    submitForm,
    uploadFile,
    getFiles
}
