const express = require("express");
const router = express.Router();

const {
  getForecast,
} = require("../src/controllers/forecastController");

/**
 * @route   GET /api/forecast
 * @desc    Get demand forecast for products
 * @access  Public (later protected)
 */
router.get("/", getForecast);

module.exports = router;
