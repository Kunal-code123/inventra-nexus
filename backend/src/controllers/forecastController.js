const Product = require("../models/Product");

/**
 * Simple demand forecasting logic
 * (Later replace with ML / time-series model)
 */
exports.getForecast = async (req, res) => {
  try {
    const products = await Product.find();

    const forecastData = products.map((product) => {
      const avgMonthlySales = Math.floor(Math.random() * 100) + 20;

      return {
        productId: product._id,
        name: product.name,
        category: product.category,
        currentStock: product.stock,
        predictedDemand: avgMonthlySales,
        reorderRequired: product.stock < avgMonthlySales,
      };
    });

    res.status(200).json({
      success: true,
      forecast: forecastData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Forecast generation failed",
      error: error.message,
    });
  }
};
