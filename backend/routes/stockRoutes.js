const express = require('express');
const router = express.Router();

const StockTransaction = require('../models/stockTransactionModel');
const Product = require('../models/productModel');

/**
 * STOCK IN (Add quantity)
 */
router.post('/in', async (req, res) => {
  try {
    const { productId, quantity, remarks } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.quantity += quantity;
    await product.save();

    const transaction = new StockTransaction({
      product: productId,
      type: 'IN',
      quantity,
      remarks
    });
    await transaction.save();

    res.status(201).json({
      message: 'Stock added successfully',
      product,
      transaction
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * STOCK OUT (Reduce quantity)
 */
router.post('/out', async (req, res) => {
  try {
    const { productId, quantity, remarks } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    product.quantity -= quantity;
    await product.save();

    const transaction = new StockTransaction({
      product: productId,
      type: 'OUT',
      quantity,
      remarks
    });
    await transaction.save();

    res.status(201).json({
      message: 'Stock removed successfully',
      product,
      transaction
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET STOCK HISTORY
 */
router.get('/history', async (req, res) => {
  try {
    const history = await StockTransaction
      .find()
      .populate('product', 'name category');

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
