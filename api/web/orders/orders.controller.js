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

const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { newData } = req.body;
        const updatedOrder = await orderService.updateOrder(orderId, newData);
        return res.json(updatedOrder);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orderService.deleteOrder(orderId);
        return res.json({ message: "Order deleted", order: deletedOrder });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
const showReport = async (req, res) => {
    try {
        const reportData = await orderService.getOrdersReport();
        return res.render("orderReport.ejs", reportData);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addOrder,
    getOrdersByUserId,
    updateOrder,
    deleteOrder,
    showReport,
};
