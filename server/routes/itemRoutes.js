const express = require('express');
const router = express.Router();
const item = require('../models/item');

// Create new item
router.post('/', async (req, res) => {
  try {
    const { name, type, description, coverImage, additionalImages } = req.body;
    
    const newItem = new item({
      name,
      type,
      description,
      coverImage,
      additionalImages
    });

    const savedItem = await newItem.save();
    res.status(201).json({
      message: 'Item successfully added!',
      item: savedItem
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
