// src/models/cartModel.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model('Cart', cartSchema);
