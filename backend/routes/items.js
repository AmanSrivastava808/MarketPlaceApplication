/*const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Assuming you have an Item model
const { protect } = require('../middleware/authMiddleware');
// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/items/:id
// @desc    Get item details by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Public
// router.post('/', async (req, res) => {
//   const { name, price, description, category, image, vendor, specifications, stock, rating, reviews } = req.body;

//   const newItem = new Item({
//     name,
//     price,
//     description,
//     category,
//     image,
//     vendor,
//     specifications,
//     stock,
//     rating,
//     reviews
//   });

//   try {
//     const item = await newItem.save();
//     res.status(201).json(item);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // @route   PUT /api/items/:id
// // @desc    Update an item
// // @access  Public
// router.put('/:id', async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     const { name, price, description, category, image, vendor, specifications, stock, rating, reviews } = req.body;

//     item.name = name || item.name;
//     item.price = price || item.price;
//     item.description = description || item.description;
//     item.category = category || item.category;
//     item.image = image || item.image;
//     item.vendor = vendor || item.vendor;
//     item.specifications = specifications || item.specifications;
//     item.stock = stock || item.stock;
//     item.rating = rating || item.rating;
//     item.reviews = reviews || item.reviews;

//     const updatedItem = await item.save();
//     res.json(updatedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // @route   DELETE /api/items/:id
// // @desc    Delete an item
// // @access  Public
// router.delete('/:id', async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     await item.remove();
//     res.json({ message: 'Item removed' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;















// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');

// Other route handlers...

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, price, description, category, image, vendor, specifications, stock, rating, reviews } = req.body;

  const newItem = new Item({
    name,
    price,
    description,
    category,
    image,
    vendor,
    specifications,
    stock,
    rating,
    reviews
  });

  try {
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const { name, price, description, category, image, vendor, specifications, stock, rating, reviews } = req.body;

    item.name = name || item.name;
    item.price = price || item.price;
    item.description = description || item.description;
    item.category = category || item.category;
    item.image = image || item.image;
    item.vendor = vendor || item.vendor;
    item.specifications = specifications || item.specifications;
    item.stock = stock || item.stock;
    item.rating = rating || item.rating;
    item.reviews = reviews || item.reviews;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.remove();
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;*/
















const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Assuming you have an Item model
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/items/:id
// @desc    Get item details by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, price, description, category, image, vendor, specifications, stock, rating, reviews } = req.body;

  const newItem = new Item({
    name,
    price,
    description,
    category,
    image,
    vendor,
    specifications,
    stock,
    rating,
    reviews
  });

  try {
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const { name, price, description, category, image, vendor, specifications, stock, rating, reviews } = req.body;

    item.name = name || item.name;
    item.price = price || item.price;
    item.description = description || item.description;
    item.category = category || item.category;
    item.image = image || item.image;
    item.vendor = vendor || item.vendor;
    item.specifications = specifications || item.specifications;
    item.stock = stock || item.stock;
    item.rating = rating || item.rating;
    item.reviews = reviews || item.reviews;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.remove();
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;