/*const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery'); // Assuming you have a Delivery model
const { protect } = require('../middleware/authMiddleware');
// @route   GET /api/deliveries
// @desc    Get all delivery options
// @access  Public
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/deliveries/:id
// @desc    Get a single delivery option by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/deliveries/:id
// @desc    Update delivery status
// @access  Public
// router.put('/:id', async (req, res) => {
//   try {
//     const delivery = await Delivery.findById(req.params.id);
//     if (!delivery) {
//       return res.status(404).json({ message: 'Delivery not found' });
//     }

//     delivery.status = req.body.status || delivery.status;
//     delivery.currentLocation = req.body.currentLocation || delivery.currentLocation;
//     delivery.estimatedDelivery = req.body.estimatedDelivery || delivery.estimatedDelivery;

//     const updatedDelivery = await delivery.save();
//     res.json(updatedDelivery);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;














// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');

// Other route handlers...

// @route   PUT /api/deliveries/:id
// @desc    Update delivery status
// @access  Private
router.put('/:id', protect, async (req, res) => {
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
});

module.exports = router;*/












const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery'); // Assuming you have a Delivery model
const { protect } = require('../middleware/authMiddleware');
const {
  getDeliveries,
  getDeliveryById,
  updateDeliveryStatus,
} = require('../controllers/deliveryController');
// @route   GET /api/deliveries
// @desc    Get all delivery options
// @access  Public
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/deliveries/:id
// @desc    Get a single delivery option by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/deliveries/:id
// @desc    Update delivery status
// @access  Private
router.put('/:id', protect, async (req, res) => {
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
});

module.exports = router;