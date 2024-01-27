const moongose = require("mongoose");

const userSchema = moongose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true 
    }, 
    image: String
});

module.exports = moongose.model("User", userSchema);