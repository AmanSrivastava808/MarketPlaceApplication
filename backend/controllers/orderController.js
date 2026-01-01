const Order = require('../models/Order'); // Assuming you have an Order model

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res) => {
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
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = async (req, res) => {
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
};

// @desc    Cancel an order
// @route   DELETE /api/orders/:id
// @access  Private
const cancelOrder = async (req, res) => {
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
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrder,
  cancelOrder,
};