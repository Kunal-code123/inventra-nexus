const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['IN', 'OUT'], // IN = added to stock, OUT = sold/removed
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models.StockTransaction ||
  mongoose.model("StockTransaction", stockTransactionSchema);