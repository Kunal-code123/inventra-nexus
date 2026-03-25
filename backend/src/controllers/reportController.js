const ExcelJS = require("exceljs");

exports.generateReport = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Title
    worksheet.addRow(["INVENTRA NEXUS REPORT"]);
    worksheet.addRow([]);

    // Sample Data (for demo)
    worksheet.addRow(["Total Revenue", 9800000]);
    worksheet.addRow(["Total Orders", 4297]);
    worksheet.addRow(["Low Stock Items", 23]);

    worksheet.addRow([]);

    worksheet.addRow(["Top Products"]);
    worksheet.addRow(["Name", "Revenue", "Units"]);

    worksheet.addRow(["iPhone 15 Pro", 45680, 156]);
    worksheet.addRow(["Samsung S24", 38920, 134]);

    // Headers
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

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating report" });
  }
};