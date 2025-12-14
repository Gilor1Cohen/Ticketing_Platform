const mongoose = require("mongoose");

async function connectTicketsDB() {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Ticketing_Platform_Tickets"
    );
    console.log("TicketsDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectTicketsDB };
