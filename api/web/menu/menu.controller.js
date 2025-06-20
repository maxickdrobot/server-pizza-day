const menuService = require("./menu.service");

const getPizzasList = async (req, res) => {
    try {
        const data = await menuService.getPizzasList();
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const renderMenu = async (req, res, next) => {
    const menu = await menuService.getPizzasList();

    return res.render("menu.ejs", { menu });
};

const renderPizza = async (req, res, next) => {
    try {
        const { pizzaId } = req.params;
        const pizza = await menuService.getPizzaById(pizzaId);

        return res.render("pizza.ejs", { pizza });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPizzasList,
    renderMenu,
    renderPizza,
};
