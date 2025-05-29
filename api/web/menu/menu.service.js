const pizzas = require("./mocks/pizzas_mock.json");

const getPizzasList = async () => {
    return pizzas;
};

const getPizzaById = async (pizzaId) => {
    const pizza = pizzas.find((pizza) => pizza.id == pizzaId);
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
