// controllers/reportController.js
const Report = require("../models/reportSchema");
const BookingLog = require("../models/bookingLogSchema");
const Escrow = require("../models/escrowScema");
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

// utility: filter query
const applyFilters = (query, filters = {}) => {
  if (filters.restaurant) query.restaurant = filters.restaurant;
  if (filters.dateRange) {
    // simple example: last-30-days
    const now = new Date();
    if (filters.dateRange === "last-30-days") {
      query.regDate = { $gte: new Date(now.setDate(now.getDate() - 30)) };
    }
  }
  return query;
};

// Get bookings preview
const getBookingsReport = async (req, res) => {
  try {
    const filters = req.query;
    const query = applyFilters({}, filters);
    const bookings = await BookingLog.find(query);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings report" });
  }
};

// Get escrow preview
const getEscrowReport = async (req, res) => {
  try {
    const filters = req.query;
    const query = applyFilters({}, filters);
    const escrow = await Escrow.find(query);
    res.json(escrow);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch escrow report" });
  }
};

// Export report

const exportReport = async (req, res) => {
  try {
    const { type, format, filters } = req.body;
    let data;

    if (type === "bookings") {
      data = await BookingLog.find(applyFilters({}, filters)).lean();
    } else if (type === "escrow") {
      data = await Escrow.find(applyFilters({}, filters)).lean();
    } else {
      return res.status(400).json({ error: "Invalid report type" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data available for export" });
    }

    let fileBuffer;
    let filename = `${type}-report.${format}`;

    if (format === "csv") {
      // 🔹 Extract fields from first record if not provided
      const fields = Object.keys(data[0]);
      const parser = new Parser({ fields });
      const csv = parser.parse(data);
      fileBuffer = Buffer.from(csv, "utf-8");
      res.setHeader("Content-Type", "text/csv");
    } else if (format === "xlsx") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report");
      worksheet.columns = Object.keys(data[0]).map((key) => ({ header: key, key }));
      worksheet.addRows(data);
      fileBuffer = await workbook.xlsx.writeBuffer();
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    } else if (format === "pdf") {
      const doc = new PDFDocument();
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        fileBuffer = Buffer.concat(buffers);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        res.send(fileBuffer);
      });

      // 🔹 Simple table-like export
      doc.fontSize(16).text(`${type.toUpperCase()} REPORT`, { align: "center" }).moveDown();
      data.forEach((row, i) => {
        doc.fontSize(10).text(`${i + 1}. ${JSON.stringify(row)}`);
      });
      doc.end();
      return; // prevent duplicate res.send
    } else {
      return res.status(400).json({ error: "Invalid format" });
    }

    await Report.create({ type, format, filters });

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.send(fileBuffer);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ error: "Failed to export report" });
  }
};

// Send report via email (stub, real impl needs nodemailer or similar)
const sendReportEmail = async (req, res) => {
  try {
    const { type, format, filters, email } = req.body;

    let data;
    if (type === "bookings") {
      data = await BookingLog.find(applyFilters({}, filters)).lean();
    } else if (type === "escrow") {
      data = await Escrow.find(applyFilters({}, filters)).lean();
    } else {
      return res.status(400).json({ error: "Invalid report type" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data available for report" });
    }

    let fileBuffer;

    if (format === "csv") {
      const fields = Object.keys(data[0]);
      const parser = new Parser({ fields });
      const csv = parser.parse(data);
      fileBuffer = Buffer.from(csv);
    } else if (format === "xlsx") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report");
      worksheet.addRow(Object.keys(data[0]));
      data.forEach((row) => worksheet.addRow(Object.values(row)));
      fileBuffer = await workbook.xlsx.writeBuffer();
    } else if (format === "pdf") {
      const doc = new PDFDocument();
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        fileBuffer = Buffer.concat(buffers);

        // Instead of sending email, we just respond with base64 so frontend knows
        return res.json({
          success: true,
          message: `Simulated email to ${email}`,
          attachment: fileBuffer.toString("base64"),
          filename: `${type}-report.${format}`,
        });
      });

      doc.text(`${type.toUpperCase()} REPORT`, { align: "center" });
      data.forEach((row) => {
        doc.text(JSON.stringify(row));
      });
      doc.end();
      return; // exit here because PDF is async
    }

    // For CSV/Excel, respond immediately
    res.json({
      success: true,
      message: `Simulated email to ${email}`,
      attachment: fileBuffer.toString("base64"), // simulate file attached
      filename: `${type}-report.${format}`,
    });

  } catch (err) {
    console.error("Email simulation error:", err);
    res.status(500).json({ error: "Failed to simulate email" });
  }
};


module.exports = {
  getBookingsReport,
  getEscrowReport,
  exportReport,
  sendReportEmail,
};
