const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: "General",
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 0,
  },

  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);