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

const renderUsers = async (req, res, next) => {
    const users = await usersService.getUsers();

    return res.render("users.pug", { users });
};

const renderUser = async (req, res, next) => {
    const { userId } = req.params;
    const user = await usersService.getUserById(userId);

    return res.render("user.pug", { user });
};

module.exports = {
    getUserById,
    addUser,
    renderUsers,
    renderUser,
};
