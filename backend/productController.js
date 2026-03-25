// backend/controllers/productController.js

const getProducts = (req, res) => {
  res.json([
    {
      id: 1,
      name: "Sample Product",
      price: 99.99
    },
    {
      id: 2,
      name: "Another Product",
      price: 149.99
    }
  ]);
};

module.exports = { getProducts };
