const orders = require("./mocks/orders_mock");

const addOrder = async (orderData) => {
    const newOrder = {
        id: orders.length + 1,
        ...orderData,
    };
    orders.push(newOrder);
    return newOrder;
};

const getOrdersByUserId = async (userId) => {
    const result = orders.filter((order) => order.userId == userId);
    return result;
};

module.exports = {
    addOrder,
    getOrdersByUserId,
};
