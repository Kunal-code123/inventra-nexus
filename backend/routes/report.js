const express = require('express');
const router = express.Router();

const Product = require('../models/productModel');
const StockTransaction = require('../models/stockTransactionModel');

const ExcelJS = require("exceljs");

/**
 * LOW STOCK REPORT
 */
router.get('/low-stock', async (req, res) => {
  try {
    const threshold = 5;
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

const PDFDocument = require("pdfkit");

/**
 * 🔥 GENERATE PDF REPORT
 */
router.get("/export", async (req, res) => {
  try {
    const type = req.query.type;

    if (type !== "pdf") {
      return res.status(400).json({ message: "Invalid type" });
    }

    const products = await Product.find();

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Inventra_Report.pdf"
    );

    doc.pipe(res);

    // Title
    doc.fontSize(18).text("INVENTRA NEXUS REPORT", { align: "center" });
    doc.moveDown();

    // Summary
    doc.fontSize(12).text(`Total Products: ${products.length}`);
    const lowStock = products.filter(p => p.quantity <= 5);
    doc.text(`Low Stock Items: ${lowStock.length}`);
    doc.moveDown();

    // Table Header
    doc.text("PRODUCT INVENTORY");
    doc.moveDown();

    products.forEach(p => {
      doc.text(
        `${p.name} | ${p.category} | Qty: ${p.quantity} | ₹${p.price}`
      );
    });

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "PDF generation failed" });
  }
});

/**
 * 🔥 GENERATE EXCEL REPORT (NEW)
 */
router.get('/generate', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Title
    const titleRow = worksheet.addRow(["INVENTRA NEXUS REPORT"]);
titleRow.font = { bold: true, size: 16 };
titleRow.alignment = { horizontal: "center" };

// Merge cells (A1 to D1)
worksheet.mergeCells("A1:D1");

titleRow.font = { bold: true, size: 16 };
    worksheet.addRow([]);

    // Fetch real data
    const products = await Product.find();

    // Summary
    worksheet.addRow(["Total Products", products.length]);

    const lowStock = products.filter(p => p.quantity <= 5);
    worksheet.addRow(["Low Stock Items", lowStock.length]);

    worksheet.addRow([]);

    worksheet.addRow([]); 

// Add empty space
worksheet.addRow([]);

// Create section title row
const sectionRow = worksheet.addRow(["PRODUCT INVENTORY"]);

// Apply styling
sectionRow.font = { bold: true, size: 12 };

    // Table Header
    const headerRow = worksheet.addRow(["Name", "Category", "Quantity", "Price"]);

headerRow.eachCell((cell) => {
  cell.font = { bold: true };
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFD3D3D3" },
  };
});

    // Data rows
    products.forEach(p => {
      worksheet.addRow([p.name, p.category, p.quantity, p.price]);
    });

    // Headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Inventra_Report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating report" });
  }
});

module.exports = router;