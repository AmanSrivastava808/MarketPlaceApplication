const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      vendor: {
        type: String,
        required: true,
      },
      specifications: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      reviews: {
        type: [String],
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
  },
  trackingNumber: {
    type: String,
  },
  otp: {
    type: String,
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
});

module.exports = mongoose.model('Order', OrderSchema);