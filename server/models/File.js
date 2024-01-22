const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    placeholders: [String]
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
