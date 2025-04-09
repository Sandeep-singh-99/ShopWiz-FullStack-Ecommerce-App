const Order = require("../models/order-model");

const getOrders = async (req, res) => {
    try {
        const userId = req.user

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ data: orders, message: 'Orders fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getOrders