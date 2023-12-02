const userModel = require('../models/userModel');

exports.home = (req, res) => {
    res.send("WELCOME TO ECOMMERCE HOMEPAGE");
};

exports.createUser = async (req, res) => {
    try {
        const {name, dob, mail, password} = req.body;

        if(!password || !mail) {
            throw new error("NAME AND EMAIL ARE REQUIRED");
            return;
        }

        const userExists = await userModel.findOne({mail});
        if (userExists) {
            throw new Error("User already Exists");
            return;
        }
        
        const user = await userModel.create({ password, mail });
        res.status(201).json({
            success: true,
            message: "User created Successfully !",
            user,
        })
        console.log(`User: ${name} Created Successfully`);
    
    } catch (error) {
        console.error('Error:', error.message); 
    }
}