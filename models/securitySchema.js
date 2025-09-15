const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema(
  {
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: true, unique: true },
    password: { type: String, required: true }, // hashed password
  },
  { timestamps: true }
);

const Security = mongoose.model("Security", securitySchema);

module.exports = Security;
