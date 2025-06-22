const mongoose = require("mongoose");
const Order = require("../../../models/orders");

const addOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
};

const getOrdersByUserId = async (userId) => {
    const result = await Order.find({ user_id: userId }).populate("items");
    return result;
};

const updateOrder = async (orderId, updateData) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    const FIFTEEN_MINUTES = 15 * 60 * 1000;
    const now = new Date();
    const createdAt = new Date(order.createdAt);

    if (now - createdAt > FIFTEEN_MINUTES) {
        throw new Error("Order can no longer be updated (time limit exceeded)");
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData).populate("items");

    return updatedOrder;
};

const deleteOrder = async (orderId) => {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    return deletedOrder;
};

module.exports = {
    addOrder,
    getOrdersByUserId,
    updateOrder,
    deleteOrder,
};
