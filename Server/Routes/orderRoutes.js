const express = require("express");
const Order = require("../model/OrderSchema");
const OrderItem = require("../model/OrderItemSchema");

const router = express.Router();

// Create a new order
router.post("/orders", async (req, res) => {
  try {
    const { customerId, date, customerName, customerEmail, customerMobile, paymentId, subTotal } = req.body;

    const newOrder = new Order({
      customerId,
      date,
      customerName,
      customerEmail,
      customerMobile,
      paymentId,
      subTotal
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Create multiple order items (products for an order)
router.post("/orderItems", async (req, res) => {
  try {
    const orderItems = req.body; // Expecting an array of products

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    const savedItems = await OrderItem.insertMany(orderItems);
    res.status(201).json(savedItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order items" });
  }
});

// GET Order API
router.get("/", async (req, res) => {
  try {
    const allOrder = await Order.find({}).sort({ date: -1 });

    res.json({ status: "success", data: allOrder });

  } catch (error) {
    console.error("Error fetching order details:", error);
    res.json({ status: "error", message: "Internal Server Error" });
  }
})

// GET Order Details API
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find order details
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find order items linked to this order
    const orderItems = await OrderItem.find({ orderID: orderId });

    res.status(200).json({
      _id: order._id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerMobile: order.customerMobile,
      paymentId: order.paymentId,
      subTotal: order.subTotal,
      products: orderItems.map(item => ({
        productName: item.productName,
        productPrice: item.productPrice,
        productImage: item.productImage,
        productQty: item.productQty
      }))
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET orders by customer ID
router.get("/customer/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const orders = await Order.find({ customerId }).sort({ date: -1 });
    res.json({ data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


// POST - mark order as returned (within 10 days only)
router.post("/return/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const placedDate = new Date(order.date);
    const today = new Date();
    const diffDays = Math.floor((today - placedDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 10) {
      return res.status(400).json({ error: "Return window expired" });
    }

    if (order.returned) {
      return res.status(400).json({ error: "Order already returned" });
    }

    order.returned = true;
    await order.save();

    res.json({ message: "Order returned successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Return failed" });
  }
});

module.exports = router;
