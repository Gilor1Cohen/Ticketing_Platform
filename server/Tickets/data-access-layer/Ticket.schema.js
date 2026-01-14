const mongoose = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new Schema({
  Price: {
    type: Number,
    required: true,
    min: 0,
  },

  Type: { type: String, required: true },

  UserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  OrderId: {
    type: Schema.Types.ObjectId,
    required: false,
  },

  Date: { type: Date, required: true },

  Title: { type: String, required: true },

  Available: { type: Boolean, required: true, default: true },

  LockedIn: { type: Date, required: false, default: null },
});

module.exports = mongoose.model("tickets", TicketSchema);
