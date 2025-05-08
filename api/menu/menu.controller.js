const menuService = require("./menu.service");

const getPizzasList = async (req, res) => {
    try {
        const data = await menuService.getPizzasList();
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPizzasList,
};
