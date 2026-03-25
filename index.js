const Product = require('./models/Product');
const Supplier = require('./models/Supplier');
const StockTransaction = require('./models/StockTransaction');

// 👇 Test inserting a supplier
app.get('/test-supplier', async (req, res) => {
  try {
    const supplier = new Supplier({
      name: 'ABC Supplies',
      contactEmail: 'abc@supplier.com',
      phone: '1234567890',
      address: 'Mumbai',
    });
    await supplier.save();
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
