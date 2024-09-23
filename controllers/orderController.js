const Order = require("../models/Order");

// get orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new order
exports.createOrder = async (req, res) => {
    const {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        products
    } = req.body;

    if (!customerName || !customerPhone || !customerAddress) {
        return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    try {
        const order = new Order({
          customerName,
          customerEmail,
          customerPhone,
          customerAddress,
          productIds: req.body.productIds,
          status: "Pending",
          products
          // user: req.user._id,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
