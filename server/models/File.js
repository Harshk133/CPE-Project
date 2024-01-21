const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: String,
    data: Buffer
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
