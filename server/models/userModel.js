const mongoose = require('mongoose');

// ADDRESS SCHEMA
const addressSchema = new mongoose.Schema({
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
    }
  });

// USER SCHEMA
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [25, "No more space"]
    },
    lastName:{
        type: String,
        trim: true,
        maxlength: [25, "No more space"]
    },
    dob: {
        type: Number,
        trim: true,
        maxlength: [8, "DDMMYYYY format only"],
        minlength: [8, "DDMMYYYY format only"]
    },
    mail:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password field cannot be empty"],
        minlength: [8, "Password must be 8 characters long"],
        trim: true
    },
    address: [addressSchema],
});

module.exports = mongoose.model("User", userSchema);