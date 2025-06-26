const Pizza = require("../../../models/menu");

const getPizzasList = async ({ ingredients = [], order = "asc" } = {}) => {
    const query = {};

    if (ingredients.length > 0) {
        query.ingredients = { $all: ingredients };
    }

    const sortOrder = order === "desc" ? -1 : 1;

    return await Pizza.find(query).sort({ unitPrice: sortOrder });
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
