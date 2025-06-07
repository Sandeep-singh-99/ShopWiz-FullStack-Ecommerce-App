const Order = require("../models/order-model");

const getOrders = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const orders = await Order.find({ userId })
      .populate("items.productId", " productImage")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    res
      .status(200)
      .json({ data: orders, message: "Orders fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const totalOrders = async (req, res) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const orders = await Order.countDocuments({ userId });

    if (orders === 0) {
      return res.status(404).json({ error: "No orders found" });
    } else {
      res
        .status(200)
        .json({ data: orders, message: "Total orders fetched successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const overAllOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    res
      .status(200)
      .json({
        data: totalOrders,
        message: "Total orders fetched successfully",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotoalAmount = async (req, res) => {
  try {
    const totalAmount = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    return res.status(200).json({
      success: true,
      data: totalAmount[0]?.total || 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to calculate total amount",
      error: error.message,
    });
  }
};

module.exports = { getOrders, totalOrders, overAllOrders, getTotoalAmount };
