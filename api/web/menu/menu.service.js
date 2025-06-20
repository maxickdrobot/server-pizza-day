const Pizza = require("../../../models/menu");

const getPizzasList = async () => {
    const menu = await Pizza.find();
    return menu;
};

const getPizzaById = async (pizzaId) => {
    const pizza = await Pizza.findById(pizzaId);

    if (pizza) {
        return pizza;
    } else {
        throw new Error("Pizza not found");
    }
};

module.exports = {
    getPizzasList,
    getPizzaById,
};
