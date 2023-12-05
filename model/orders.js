const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  users: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: [true, "user id not found"],
  },
  products: {
    type: mongoose.SchemaTypes.Array,
    default: undefined,
    required: [true, "no products found"],
  },
  totalPrice: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
    required: [true, "price not found"],
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending",
  },
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;
