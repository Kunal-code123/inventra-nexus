const cors = require("cors");

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// backend/server.js

app.use("/api/forecast", require("./routes/forecastRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ Connection error:', err));



// Test Route
app.get('/', (req, res) => {
  res.send('Inventra Backend Running!');
});

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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
