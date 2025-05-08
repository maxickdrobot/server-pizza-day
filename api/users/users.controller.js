const usersService = require("./users.service");

const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await usersService.getUserById(userId);
        return res.json(user);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

const addUser = async (req, res) => {
    const userData = req.body;

    try {
        const newUser = await usersService.addUser(userData);
        return res.json({ newUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUserById,
    addUser,
};
