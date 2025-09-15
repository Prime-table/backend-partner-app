const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const reservationRoutes = require('./routes/reservationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const analyticsSummaryRoutes = require("./routes/analyticsSummaryRoutes");
const promotionRoutes = require('./routes/promotionRoutes');
const profileSettingRoutes = require("./routes/profileSettingRoutes");
const payoutDetailsRoutes = require("./routes/payoutDetailsRoutes");
const securityRoutes = require("./routes/securityRoutes");
const communicationRoutes = require("./routes/communicationRoutes");
const dashboardSummaryRoutes = require('./routes/dashboardSummaryRoutes');



const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());

//connectedDb
connectDb();

app.use('/prime-table-partner/auth', authRoutes);
app.use('/prime-table-partner/reservations', reservationRoutes);
app.use('/prime-table-partner/dashboard', dashboardRoutes);
app.use("/prime-table-partner/restaurants", restaurantRoutes);
app.use('/prime-table-partner/analytics', analyticsRoutes);
app.use("/prime-table-partner/analytics-summary", analyticsSummaryRoutes);
app.use('/prime-table-partner/promotions', promotionRoutes);
app.use("/prime-table-partner/profile-setting", profileSettingRoutes);
app.use("/prime-table-partner/payout", payoutDetailsRoutes);
app.use("/prime-table-partner/security", securityRoutes);
app.use("/prime-table-partner/settings", communicationRoutes);
app.use('/prime-table-partner', dashboardSummaryRoutes);

app.get("/", (req, res) => {
  res.send("Prime Table Backend is running ");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
