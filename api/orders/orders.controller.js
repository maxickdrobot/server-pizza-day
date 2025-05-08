const orderService = require("./orders.service");

const addOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await orderService.addOrder(orderData);
        return res.json(newOrder);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const userOrders = await orderService.getOrdersByUserId(userId);
        if (userOrders.length > 0) {
            return res.json(userOrders);
        }
        return res.status(404).json({ error: "Orders not found" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addOrder,
    getOrdersByUserId,
};
