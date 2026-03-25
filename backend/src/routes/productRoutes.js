const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/productController');

router.post('/add', createProduct);
router.get('/', getAllProducts);

module.exports = router;
