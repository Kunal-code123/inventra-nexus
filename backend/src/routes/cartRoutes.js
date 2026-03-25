// src/routes/cartRoutes.js
const express = require('express');
const router = express.Router();

const { getCartItems } = require('../controllers/cartController');

router.get('/', getCartItems); // ✅ Route to fetch all cart items

module.exports = router;
