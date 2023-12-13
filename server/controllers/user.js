const userModel = require('../models/userModel');
const moment = require('moment');
const bcrypt = require('bcrypt');

const check = (req, res) => {
    res.status(200).json({
        success: true,
        message: "WELCOME TO ECOMMERCE HOMEPAGE"
    });
};

const register = async (req, res) => {
    try {
        console.log("Request to create a user received");
        // collect data
        const {firstName, lastName, dob, mail, password} = req.body;
        // existing user check
        const userExists = await userModel.findOne({ mail });
        // validate date
        function isValidDate(dob) {
            return moment(dob, 'DDMMYYYY', true).isValid();
        }
        if(!firstName || !mail || !password) {
            throw new Error("NAME, MAIL & PASSWORD MANDATORY");
        }
        if (firstName === lastName) {
            throw new Error("Firstname cannot be repeated as the Lastname");
        }
        if (!isValidDate(dob)) {
            throw new Error("Invalid date entered");
        }
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
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
    
    } catch (err) {
        console.error('Error:', err.message);
        console.log('Error ! Registration Failed');
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = { check, register};