const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// POST new item
router.post('/items', async (req, res) => {
  const { name, quantity, category } = req.body;

  const newItem = new Item({ name, quantity, category });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error saving item' });
  }
});

module.exports = router;
