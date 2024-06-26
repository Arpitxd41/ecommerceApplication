const userModel = require('../models/userModel.js');
const cartModel = require('../models/cartModel.js');
// const moment = require('moment');
const bcrypt = require('bcrypt');
const jwtToken = require('jsonwebtoken');

// LOGIN TIMEOUT
const generateToken = (user) => {
    // GENERATING TOKEN
    const secretKey = process.env.JWT_SECRET || 'default-secret-key';
    return jwtToken.sign({ userId: user._id, email: user.mail }, secretKey, { expiresIn: '30m' });
};

// REGISTER A NEW USER
const register = async (req, res) => {
    try {
        console.log("Request to create a user received");

        const { firstName, lastName, mail, password } = req.body;

        const userExists = await userModel.findOne({ mail });
        if (userExists) {
            console.log('User already exists');
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // // Validate DATE OF BIRTH :
        // function isValidDate(dob) {
        //     return moment(dob, 'DDMMYYYY', true).isValid();
        // }
        // if (!isValidDate(dob)) {
        //     throw new Error("Invalid date entered");
        // }

        // Check if input fields are empty
        if (!firstName || !mail || !password) {
            throw new Error("NAME, MAIL & PASSWORD MANDATORY");
        }

        if (firstName === lastName) {
            throw new Error("Firstname cannot be repeated as the Lastname");
        }

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            firstName,
            lastName,
            mail,
            password: hashedPassword,            
        });

        // Save the new user
        await newUser.save();

        // Create a cart for the new user
        const newCart = new cartModel({
            user: newUser._id,
        });

        // Save the new cart
        await newCart.save();

        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: 'User creation successful',
            token,
            user: newUser,
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

// LOGIN USER TO APPLICATION :-
const login = async (req, res) => {
    try {
        console.log("User login request received...");
        // collecting data
        const { mail, password } = req.body;
        const user = await userModel.findOne({ mail });
        // User not in DB
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found ! Invalid mail or password",
            });
        }
        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password does not match. Login Unauthorized'
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: 'Login Successful',
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });
        // Response for successful login
        console.log(`${user.role}: ${user.firstName} Login Successful ;)`);
    } catch (error) {
        console.error('Error:', error.message);
        console.log('Error ! Login Failed');
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// GRAB THE USER BY USER'S ID :-
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            user,
        });
        console.log(`User retrieved: ${user.firstName}`);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const addAddress = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { street, city, postalCode, phoneNumber } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'user not found'});
        }
        const newAddress = { street, city, postalCode, phoneNumber };
        user.address.push(newAddress);
        await user.save();
        res.status(201).json({message: 'Address successfully added', user});
    } catch {
        console.error('Error while adding a new address');
        res.status(500).json({ message: 'internal server error'});
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        // Return the list of users
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            users,
        });

        console.log('All users retrieved');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// FORGOT PASSWORD:
const forgotPassword = async (req, res) => {
    try {
        const { mail, firstName, dob } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ mail });

        // Additional check for firstName and dob
        if (!user || user.firstName !== firstName || user.dob !== dob) {
            return res.status(404).json({
                success: false,
                message: 'User not found or invalid credentials',
            });
        }

        // Generate a temporary password
        const temporaryPassword = Math.random().toString(36).slice(-8);

        // Hash the temporary password
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

        // Update the user's password in the database
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        // Sends the temporary password to the user (You may implement email sending logic here)

        res.status(200).json({
            success: true,
            message: 'Temporary password sent successfully',
        });

        console.log(`Temporary password sent to user: ${user.firstName}`);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// EDIT USER DETAILS FOR A SPECIFIC USER :-
const editUser = async (req, res) => {
    try {
        const adminId = req.params.id;
        const { role, userId  } = req.body;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Update user role in the database
        await userModel.findByIdAndUpdate(userId, {
            role,
        });

        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
        });

        console.log(`User role updated: ${userId}`);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


// TO DELETE AN EXISTING USER :-
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        await userCart.findOneAndDelete({user: userId});
        await userModel.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });

        console.log(`User deleted: ${user.firstName}`); 
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    generateToken, 
    register, 
    login, 
    getUser, 
    addAddress, 
    getAllUsers, 
    editUser, 
    forgotPassword, 
    deleteUser
};
