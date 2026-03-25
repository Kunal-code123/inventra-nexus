const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ Define Cart schema
const cartSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// ✅ Create Cart model
const Cart = mongoose.model('Cart', cartSchema);

// ----------------------
// GET all cart items
// ----------------------
router.get('/', async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----------------------
// POST new cart item
// ----------------------
router.post('/', async (req, res) => {
  try {
    const newItem = new Cart({
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      price: req.body.price
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ----------------------
// DELETE cart item by ID
// ----------------------
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
