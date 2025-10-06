const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
