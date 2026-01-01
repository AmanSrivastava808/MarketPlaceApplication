/*const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model
const { protect } = require('../middleware/authMiddleware');
// @route   GET /api/orders
// @desc    Get all orders
// @access  Public
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/orders
// @desc    Place a new order
// @access  Public
// router.post('/', async (req, res) => {
//   const { items, total, status, orderDate, deliveryDate, trackingNumber, otp, buyer, seller } = req.body;

//   const newOrder = new Order({
//     items,
//     total,
//     status,
//     orderDate,
//     deliveryDate,
//     trackingNumber,
//     otp,
//     buyer,
//     seller
//   });

//   try {
//     const order = await newOrder.save();
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // @route   PUT /api/orders/:id
// // @desc    Update an order
// // @access  Public
// router.put('/:id', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     const { items, total, status, orderDate, deliveryDate, trackingNumber, otp, buyer, seller } = req.body;

//     order.items = items || order.items;
//     order.total = total || order.total;
//     order.status = status || order.status;
//     order.orderDate = orderDate || order.orderDate;
//     order.deliveryDate = deliveryDate || order.deliveryDate;
//     order.trackingNumber = trackingNumber || order.trackingNumber;
//     order.otp = otp || order.otp;
//     order.buyer = buyer || order.buyer;
//     order.seller = seller || order.seller;

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // @route   DELETE /api/orders/:id
// // @desc    Cancel an order
// // @access  Public
// router.delete('/:id', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     await order.remove();
//     res.json({ message: 'Order canceled' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;






















// filepath: /c:/Users/sriva/Desktop/project/backend/routes/orders.js

// const express = require('express');
// const router = express.Router();


// Other route handlers...

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  const { items, total, status, orderDate, deliveryDate, trackingNumber, otp, buyer, seller } = req.body;

  const newOrder = new Order({
    items,
    total,
    status,
    orderDate,
    deliveryDate,
    trackingNumber,
    otp,
    buyer,
    seller
  });

  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update an order
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { items, total, status, orderDate, deliveryDate, trackingNumber, otp, buyer, seller } = req.body;

    order.items = items || order.items;
    order.total = total || order.total;
    order.status = status || order.status;
    order.orderDate = orderDate || order.orderDate;
    order.deliveryDate = deliveryDate || order.deliveryDate;
    order.trackingNumber = trackingNumber || order.trackingNumber;
    order.otp = otp || order.otp;
    order.buyer = buyer || order.buyer;
    order.seller = seller || order.seller;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel an order
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.remove();
    res.json({ message: 'Order canceled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;*/













const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  const { items, total, status, orderDate, deliveryDate, trackingNumber, otp, buyer, seller } = req.body;

  const newOrder = new Order({
    items,
    total,
    status,
    orderDate,
    deliveryDate,
    trackingNumber,
    otp,
    buyer,
    seller
  });

  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update an order
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { items, total, status, orderDate, deliveryDate, trackingNumber, otp, buyer, seller } = req.body;

    order.items = items || order.items;
    order.total = total || order.total;
    order.status = status || order.status;
    order.orderDate = orderDate || order.orderDate;
    order.deliveryDate = deliveryDate || order.deliveryDate;
    order.trackingNumber = trackingNumber || order.trackingNumber;
    order.otp = otp || order.otp;
    order.buyer = buyer || order.buyer;
    order.seller = seller || order.seller;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel an order
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.remove();
    res.json({ message: 'Order canceled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;