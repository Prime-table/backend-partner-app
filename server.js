const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes')



const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

//connectedDb
connectDb();

app.use('/prime-table-partner/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Prime Table Backend is running ");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
