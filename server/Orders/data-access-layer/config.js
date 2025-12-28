const mongoose = require("mongoose");

async function connectOrdersDB() {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Ticketing_Platform_Orders"
    );
    console.log("OrdersDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectOrdersDB };
