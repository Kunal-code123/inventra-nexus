const Product = require("../models/Product");

/**
 * GET /api/forecast
 * Description: Basic demand forecasting based on stock trends
 */
exports.getForecastData = async (req, res) => {
  try {
    const products = await Product.find();

    // Simulated forecasting logic (safe + academic)
    const forecast = products.map((product) => {
      let demandLevel = "Stable";

      if (product.stock < 50) demandLevel = "High";
      else if (product.stock > 200) demandLevel = "Low";

      return {
        product: product.name,
        category: product.category,
        currentStock: product.stock,
        predictedDemand: demandLevel,
        forecastNextMonth:
          demandLevel === "High"
            ? product.stock + 120
            : demandLevel === "Stable"
            ? product.stock + 60
            : product.stock + 20,
      };
    });

    res.status(200).json({
      success: true,
      forecast,
    });
  } catch (error) {
    console.error("Forecast Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate forecast",
    });
  }
};
