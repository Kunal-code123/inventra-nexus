// backend/controllers/cartController.js

import Cart from '../models/cartModel.js';

// @desc    Get all cart items
// @route   GET /api/cart
// @access  Public
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({});
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new item to cart
// @route   POST /api/cart
// @access  Public
export const addToCart = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newCartItem = new Cart({ name, price });
    const createdItem = await newCartItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
