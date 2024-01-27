const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    placeholders: [String],
    uploadedBy: String,
    downloadedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

fileSchema.methods.remove = function () {
    // Your custom remove logic here
    // For example, to remove the document from the database
    return this.model('File').deleteOne({ _id: this._id });
};

const File = mongoose.model("File", fileSchema);

module.exports = File;
