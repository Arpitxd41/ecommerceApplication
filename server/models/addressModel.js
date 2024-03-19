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

module.exports = mongoose.model("Address", addressSchema);