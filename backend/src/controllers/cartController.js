// src/controllers/cartController.js
const CartItem = require('../models/cartModel');

const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items' });
  }
};

module.exports = { getCartItems };
