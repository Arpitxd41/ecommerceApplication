const userModel = require('../models/userModel');
const moment = require('moment');
const bcrypt = require('bcrypt');

const check = (req, res) => {
// Check if the user is logged in
    if (req.isAuthenticated()) {
    // If logged in, send a welcome message and user details
        res.status(200).json({
            success: true,
            message: `Welcome to the E-commerce homepage, ${req.user.firstName}!`,
            user: {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
    // Include other user data you want to send in the response
            },
        });
    } else {
    // If not logged in, send a generic welcome message
        res.status(200).json({
            success: true,
            message: "Welcome to the E-commerce homepage",
        });
    }
};


const register = async (req, res) => {
    try {
        console.log("Request to create a user received");
// collect data
        const {firstName, lastName, dob, mail, password} = req.body;

// existing user check
        const userExists = await userModel.findOne({ mail });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
// validate date entry
        function isValidDate(dob) {
            return moment(dob, 'DDMMYYYY', true).isValid();
        }
        if (!isValidDate(dob)) {
            throw new Error("Invalid date entered");
        }
//  empty input fields
        if(!firstName || !mail || !password) {
            throw new Error("NAME, MAIL & PASSWORD MANDATORY");
        }
        if (firstName === lastName) {
            throw new Error("Firstname cannot be repeated as the Lastname");
        }
// password hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            firstName,
            lastName,
            dob,
            mail,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created Successfully !",
            user: newUser,
        })
        console.log(`User: ${firstName} Created Successfully`);
        return res.redirect('/');
    } catch (err) {
        console.error('Error:', err.message);
        console.log('Error ! Registration Failed');
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

// USER LOGIN :-
const login = async (req, res) => {
    try {
        console.log("User login request received...");
        // collect data
        const { mail, password } = req.body;
        const user = await userModel.findOne({ mail });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found...........",
            });
        }
        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized'
            });
        }
        // Return a response for successful login        
        console.log(`User: ${user.firstName} Login Successful`);
        return res.redirect('/');
    } catch (error) {
        console.error('Error:', error.message);
        console.log('Error ! Login Failed');
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


module.exports = { check, register, login};