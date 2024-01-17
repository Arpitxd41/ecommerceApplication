const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: number,
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
    type: number,
    required: true
  },
});

module.exports = mongoose.model('Product', productSchema);
