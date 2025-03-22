const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true },
  productQty: { type: Number, required: true },
  orderID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Order" } // Reference to Order
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
