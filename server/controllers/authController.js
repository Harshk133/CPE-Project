
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

// Connecting to the database
// Connected to mongodb
mongoose.connect("mongodb://localhost:27017/MugBitDB");

// Signup controller goes here..
const signup = async (req, res) => {
    try {
        const { username, useremail, password } = req.body;

        console.log(req.body);

        // check if the user already exists
        const existingUser = await User.findOne({ useremail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        // Now, create a new user
        const newUser = new User({
            username,
            email: useremail,
            password: hashedPassword
        });

        // Saving the new user..
        await newUser.save();

        // Create a JWT Token.
        const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
        const token = jwt.sign({
            email: newUser.email
        }, secretKey);

        // Respond with the token and user information
        res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.log("Error during Signup: ", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT Token
        const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
        const token = jwt.sign({ email: user.email }, secretKey);

        // Respond with the token and user information
        res.status(200).json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const profile = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    signup,
    login,
    profile
}
