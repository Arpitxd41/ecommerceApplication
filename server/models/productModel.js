const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true
  },
});

const ProductModel = mongoose.model('ProductModel', productSchema);

module.exports = ProductModel;
