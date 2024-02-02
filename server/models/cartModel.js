const mongoose = require('mongoose');
const ProductModel = require('./productModel')
const UserModel = require('./userModel');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    ref: 'ProductModel',
    required: true,
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
