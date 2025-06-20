const Pizza = require("../../../models/menu");

const getPizzasList = async () => {
    const menu = await Pizza.find();
    return menu;
};

const getPizzaById = async (pizzaId) => {
    try {
        const pizza = await Pizza.findById(pizzaId);
        return pizza;
    } catch (error) {
        throw new Error("Pizza with id: " + pizzaId + " not found");
    }
};

module.exports = {
    getPizzasList,
    getPizzaById,
};
