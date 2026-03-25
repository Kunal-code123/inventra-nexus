const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Make sure the path is correct

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new item
router.post('/items', async (req, res) => {
  try {
    const { name, quantity, category } = req.body;
    const newItem = new Item({ name, quantity, category });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error saving item:', error.message); // Shows error in terminal
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
