// backend/controllers/productController.js
const getAllProducts = (req, res) => {
  res.json([
    { id: 1, name: "Sample Product", price: 99.99 },
    { id: 2, name: "Another Product", price: 149.99 },
  ]);
};

const createProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  res.status(201).json({
    message: "Product created successfully",
    product: { name, price },
  });
};

module.exports = { getAllProducts, createProduct };
exports.deleteFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
