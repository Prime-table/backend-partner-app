const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connectDb = require('./config/db');

//Partner Routes
const authRoutes = require('./routes/authRoutes')
const reservationRoutes = require('./routes/reservationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const bookingRoutes = require('./routes/reservationRoutes');

const analyticsRoutes = require('./routes/analyticsRoutes');
const analyticsSummaryRoutes = require("./routes/analyticsSummaryRoutes");
const promotionRoutes = require('./routes/promotionRoutes');
const profileSettingRoutes = require("./routes/profileSettingRoutes");
const payoutDetailsRoutes = require("./routes/payoutDetailsRoutes");
const securityRoutes = require("./routes/securityRoutes");
const communicationRoutes = require("./routes/communicationRoutes");
const dashboardSummaryRoutes = require('./routes/dashboardSummaryRoutes');

//Admin Routes
const adminRoutes = require('./routes/adminRoute');
const adminSettingsRoutes = require('./routes/adminSettingsRoutes');
const adminBrandingRoutes = require('./routes/adminBrandingRoutes');
const adminIntegrationRoutes = require('./routes/adminIntegrationRoutes');
const adminNotificationsRoutes = require('./routes/adminNotificationsRoutes');
const adminSecurityRoutes = require('./routes/adminSecurityRoutes');
const escrowRoutes = require('./routes/escrowRoutes');
const bookingLogRoutes = require('./routes/bookingLogRoutes');

//userRoutes
const userRestaurantRoutes = require("./routes/userRestaurantRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const userBookingRoutes = require("./routes/bookingLogRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const userAuthRoutes = require("./routes/userBookingRoutes");





const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "http://localhost:3001", // local dev (another port you had)
      "https://frontend-partner-app.onrender.com", // production/staging
      "https://frontend-partner-app.onrender.com",
      "https://prime-table-admin.vercel.app/login" 
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());

//connectedDb
connectDb();

//Partner Routes
app.use('/auth', authRoutes);
app.use('/reservation', reservationRoutes);
app.use('/bookings', bookingRoutes);
app.use("/restaurant", restaurantRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/analytics', analyticsRoutes);
app.use("/analytics-summary", analyticsSummaryRoutes);
app.use('/promotions', promotionRoutes);
app.use("/profile-setting", profileSettingRoutes);
app.use("/payout", payoutDetailsRoutes);
app.use("/security", securityRoutes);
app.use("/settings", communicationRoutes);
app.use('/dashboard-summary', dashboardSummaryRoutes);

//Admin Routes
app.use('/prime-table-admin', adminRoutes);
app.use('/prime-table-admin/settings', adminSettingsRoutes);
app.use('/prime-table-admin/settings', adminBrandingRoutes);
app.use('/prime-table-admin/settings/integration', adminIntegrationRoutes);
app.use('/prime-table-admin/settings/notifications', adminNotificationsRoutes); 
app.use('/prime-table-admin/settings/security', adminSecurityRoutes);
app.use('/prime-table-admin/escrows', escrowRoutes);
app.use('/prime-table-admin/bookings', bookingLogRoutes);

//userRoutes
app.use('/user', userRestaurantRoutes);
app.use('/user', userAuthRoutes);
app.use('/user', newsletterRoutes);
app.use('/user', userBookingRoutes);
app.use('/user', ratingRoutes);



app.get("/", (req, res) => {
  res.send("Prime Table Backend is running ");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
