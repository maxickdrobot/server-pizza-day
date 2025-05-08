const pizzas = require("./mocks/pizzas_mock.json");

const getPizzasList = async () => {
    return pizzas;
};

module.exports = {
    getPizzasList,
};
