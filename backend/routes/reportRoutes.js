const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

const express = require("express");
const router = express.Router();

const Product = require("../models/productModel");
const StockTransaction = require("../models/stockTransactionModel");

/**
 * TEMP FIX - ADD DEFAULT QUANTITY TO OLD RECORDS
 */
router.get("/fix-quantities", async (req, res) => {
  try {
    const result = await Product.updateMany(
      { quantity: { $exists: false } },
      { $set: { quantity: 100 } }
    );

    res.json({
      message: "Quantities fixed",
      modified: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * LOW STOCK REPORT
 */
router.get('/low-stock', async (req, res) => {
  try {
    const threshold = 5; // configurable
    const products = await Product.find({ quantity: { $lte: threshold } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PRODUCT STOCK SUMMARY
 */
router.get('/stock-summary', async (req, res) => {
  try {
    const products = await Product.find({}, 'name category quantity price');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * STOCK MOVEMENT REPORT
 */
router.get('/stock-movement', async (req, res) => {
  try {
    const history = await StockTransaction
      .find()
      .populate('product', 'name category')
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * EXPORT STOCK SUMMARY - EXCEL
 */
router.get("/export-excel", async (req, res) => {
  try {
    const products = await Product.find().lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Stock Summary");

    worksheet.columns = [
      { header: "Product Name", key: "name", width: 25 },
      { header: "Category", key: "category", width: 20 },
      { header: "Quantity", key: "quantity", width: 15 },
      { header: "Price", key: "price", width: 15 },
    ];

    products.forEach((product) => {
      worksheet.addRow({
        name: product.name,
        category: product.category,
        quantity: product.quantity || product.stock,
        price: product.price,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Inventra_Stock_Report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * EXPORT REPORT (PDF / EXCEL)
 */
router.get("/export", async (req, res) => {
  try {
    const { type } = req.query;

    const products = await Product.find().lean();  // ✅ FIXED

    if (type === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report");

      worksheet.columns = [
        { header: "Product Name", key: "name", width: 25 },
        { header: "Category", key: "category", width: 20 },
        { header: "Quantity", key: "quantity", width: 15 },
        { header: "Price", key: "price", width: 15 },
      ];

      products.forEach((product) => {
        worksheet.addRow(product);
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=report.xlsx"
      );

      await workbook.xlsx.write(res);
      res.end();
    }

    else if (type === "pdf") {
      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=report.pdf"
      );

      doc.pipe(res);

      doc.fontSize(18).text("Inventra Nexus Report", { align: "center" });
      doc.moveDown();

      products.forEach((product, index) => {
  doc
    .fontSize(12)
    .text(
      `${index + 1}. ${product.name} | ${product.category} | Qty: ${product.quantity || product.stock} | ₹${product.price}`
    );
});

      doc.end();
    }

    else {
      res.status(400).json({ message: "Invalid export type" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
