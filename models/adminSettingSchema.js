const mongoose = require("mongoose");

const AdminSettingsSchema = new mongoose.Schema(
  {
    general: {
      platformName: { type: String, default: "Prime Table" },
      currency: { type: String, default: "NGN(₦)" },
      timezone: { type: String, default: "Africa/Lagos" },
      reservation: { type: Number, default: 60 },
      supportEmail: { type: String, default: "Support@primetable.com" },
    },
    branding: {
      primaryColor: { type: String, default: "#FF0000" },
      secondaryColor: { type: String, default: "#000000" },
      logo: { type: String, default: "/logo.png" },
      favicon: { type: String, default: "/favicon.ico" },
    },
    integration: {
      paymentGateway: { type: String, default: "Stripe" },
      emailService: { type: String, default: "SendGrid" },
      smsProvider: { type: String, default: "Twilio" },
      apiKeys: [
        {
          key: String,
          createdAt: { type: Date, default: Date.now },
          status: { type: String, default: "active" },
        },
      ],
    },
    notifications: {
      partnerApprovals: { type: Boolean, default: true },
      newBookings: { type: Boolean, default: true },
      escrowPayouts: { type: Boolean, default: true },
      systemUpdates: { type: Boolean, default: false },
      weeklyReports: { type: Boolean, default: true },
      securityAlerts: { type: Boolean, default: true },
    },
    security: {
      twoFactorAuthentication: { type: Boolean, default: true },
      requireStrongPassword: { type: Boolean, default: true },
      sessionTimeout: { type: Number, default: 30 },
      failedLoginLockout: { type: Number, default: 5 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminSettings", AdminSettingsSchema);
