const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
  },
  estimatedDelivery: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  },
  buyer: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  seller: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  updates: [
    {
      date: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Delivery', DeliverySchema);