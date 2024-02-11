const mongoose = require('mongoose');
const ProductModel = require('./productModel');
const UserModel = require('./userModel');


const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel',
    required: true,
  },
  productNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  }
});

const userCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  cartItems: [cartItemSchema]
});

const userCart = mongoose.model('UserCart', userCartSchema);

module.exports = userCart;
