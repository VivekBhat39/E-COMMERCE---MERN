const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer" },
  date: { type: Date, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerMobile: { type: String, required: true },
  paymentId: { type: String, required: true },
  subTotal: { type: Number, required: true }
});

module.exports = mongoose.model("Order", orderSchema);
