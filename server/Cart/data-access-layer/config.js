const mongoose = require("mongoose");

async function connectCartsDB() {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Ticketing_Platform_Carts"
    );
    console.log("CartsDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectCartsDB };
