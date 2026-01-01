const Delivery = require('../models/Delivery'); // Assuming you have a Delivery model

// @desc    Get all delivery options
// @route   GET /api/deliveries
// @access  Public
const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a single delivery option by ID
// @route   GET /api/deliveries/:id
// @access  Public
const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update delivery status
// @route   PUT /api/deliveries/:id
// @access  Private
const updateDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    delivery.status = req.body.status || delivery.status;
    delivery.currentLocation = req.body.currentLocation || delivery.currentLocation;
    delivery.estimatedDelivery = req.body.estimatedDelivery || delivery.estimatedDelivery;

    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDeliveries,
  getDeliveryById,
  updateDeliveryStatus,
};