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

  try {
    // Just returning the input for now (no database yet)
    return res.status(201).json({
      message: "Product created successfully",
      product: {
        id: Date.now(), // Mock product ID
        name,
        price,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product" });
  }
};

module.exports = { getAllProducts, createProduct };
