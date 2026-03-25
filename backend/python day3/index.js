const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('📦 Starting Inventra Backend...');

const app = express();
app.use(express.json());

// Print out the URI to make sure .env is loaded
console.log('🌐 Mongo URI from .env:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected');
    
    // Start server only after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB Connection error:', err.message);
  });

// Route
app.get('/', (req, res) => {
  res.send('Inventra Backend Running!');
});
