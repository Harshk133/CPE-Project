
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getDatabase } = require("../db");

// Signup controller goes here..
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Now, create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Saving the new user..
        await newUser.save();

        // Create a JWT Token.
        const token = jwt.sign({
            email: newUser.email
        }, "helloworldprogrammersecretkey");

        // Respond with the token and user information
        res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.log("Error during Signup: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    signup
}
