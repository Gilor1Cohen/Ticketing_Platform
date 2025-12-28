const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItemSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    Price: { type: Number, required: true, min: 0 },
    Type: { type: String, required: true },
    Date: { type: Date, required: true },
    Title: { type: String, required: true },
  },
  { _id: false }
);

const OrdersSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  Items: { type: [CartItemSchema], required: true, default: [] },

  CreatedAt: { type: Date, required: true },
});

module.exports = mongoose.model("Orders", OrdersSchema);
