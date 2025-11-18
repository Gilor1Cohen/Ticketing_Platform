const mongoose = require("mongoose");

async function connectAuthDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Ticketing_Platform_Auth");
    console.log("AuthDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectAuthDB };
