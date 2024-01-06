const userModel = require('../models/userModel');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwtToken = require('jsonwebtoken');

const generateToken = (user) => {
    // GENERATING TOKEN
    return jwtToken.sign({ userId: user._id, email: user.mail }, 'your-secret-key', { expiresIn: '1h' });
};

const register = async (req, res) => {
    try {
        console.log("Request to create a user received");
        // collect data
        const { firstName, lastName, dob, mail, password } = req.body;

        // Check if the user already exists in Database
        const userExists = await userModel.findOne({ mail });
        if (userExists) {
            console.log('User already exists');
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // Validate date entry for DOB
        function isValidDate(dob) {
            return moment(dob, 'DDMMYYYY', true).isValid();
        }
        if (!isValidDate(dob)) {
            throw new Error("Invalid date entered");
        }
        //  Check if input fields are empty
        if (!firstName || !mail || !password) {
            throw new Error("NAME, MAIL & PASSWORD MANDATORY");
        }
        if (firstName === lastName) {
            throw new Error("Firstname cannot be repeated as the Lastname");
        }
        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            firstName,
            lastName,
            dob,
            mail,
            password: hashedPassword,
        });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({
            success: true,
            message: 'User creation successful',
            token,
        });
        console.log(`User: ${firstName} Created Successfully`);
    } catch (err) {
        console.error('Error:', err.message);
        console.log('Error ! Registration Failed');
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

// USER LOGIN :-
const login = async (req, res) => {
    try {
        console.log("User login request received...");
        // collect data
        const { mail, password } = req.body;
        const user = await userModel.findOne({ mail });
        // User not in DB
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found...........",
            });
        }
        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: 'Login Successful',
            token,
        });
        // Return a response for successful login        
        console.log(`User: ${user.firstName} Login Successful`);
    } catch (error) {
        console.error('Error:', error.message);
        console.log('Error ! Login Failed');
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = { generateToken, register, login };
