const mongoose = require("mongoose");
const Order = require("../../../models/orders");

const isLoyalCustomer = async (userId) => {
    const orderCount = await Order.countDocuments({ user_id: userId });
    return orderCount >= 5;
};

const addOrder = async (orderData) => {
    const isLoyal = await isLoyalCustomer(orderData.user_id);

    if (isLoyal) {
        orderData.total = +(orderData.total * 0.9).toFixed(2);
        orderData.discountApplied = true;
    }

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

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData);

    return updatedOrder;
};

const deleteOrder = async (orderId) => {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    return deletedOrder;
};

async function getOrdersReport() {
    const report = await Order.aggregate().facet({
        uniqueUsers: [{ $group: { _id: "$user_id" } }, { $count: "value" }],
        totalOrders: [{ $count: "value" }],
        totalAvrg: [
            {
                $group: {
                    _id: null,
                    maxBill: { $max: "$total" },
                    minBill: { $min: "$total" },
                    avgBill: { $avg: "$total" },
                },
            },
        ],
        topPizzas: [
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items",
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "menu",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $project: {
                    count: 1,
                    name: "$product.name",
                },
            },
            { $sort: { count: -1 } },
        ],
        regularClients: [
            {
                $group: {
                    _id: "$user_id",
                    ordersCount: { $sum: 1 },
                    totalSpent: { $sum: "$total" },
                },
            },
            { $match: { ordersCount: { $gte: 5 } } },
            {
                $project: {
                    userId: "$_id",
                    ordersCount: 1,
                    totalSpent: { $round: ["$totalSpent", 2] },
                    _id: 0,
                },
            },
            { $sort: { ordersCount: -1 } },
        ],
    });

    const data = report[0] || {};

    return {
        uniqueUsers: data.uniqueUsers?.[0]?.value || 0,
        totalOrders: data.totalOrders?.[0]?.value || 0,
        maxCheck: data.totalAvrg?.[0]?.maxBill || 0,
        minCheck: data.totalAvrg?.[0]?.minBill || 0,
        averageCheck: data.totalAvrg?.[0]?.avgBill || 0,
        topPizzas: data.topPizzas || [],
        regularClients: data.regularClients || [],
    };
}

module.exports = {
    addOrder,
    getOrdersByUserId,
    updateOrder,
    deleteOrder,
    getOrdersReport,
};
