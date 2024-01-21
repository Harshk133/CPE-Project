const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  file: { type: String, required: true }, // You may adjust the type based on how you store the file
  placeholders: [{ type: String }], // Assuming placeholders are strings
  // Add more fields as needed
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;

