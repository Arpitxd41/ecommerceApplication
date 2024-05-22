const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  discountPercentage: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    default: '5.0'
  },
  images: {
    type: [],
    required: true
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
