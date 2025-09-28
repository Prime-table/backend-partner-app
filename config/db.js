const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URL); 
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDb");

  } catch (error) {
    console.error("❌ error connecting to MongoDb:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
