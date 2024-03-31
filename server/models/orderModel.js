const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  selectedProducts: [
      {
        productNumber: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        checked: {
          type: Boolean,
          default: true
        },
        category: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true
        }
      }
    ],
  selectedAddress: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: Number,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderDetails: [{
    type: Object
  }],
  paymentDetails: [{
    type: Object
  }]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
