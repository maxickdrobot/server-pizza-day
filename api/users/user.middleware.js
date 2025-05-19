const usersService = require("./users.service");

const checkUserExistFalse = async (req, res, next) => {
    const { email } = req.body;

    const users = await usersService.getUsers();
    const user = users.find((user) => user.email === email);

    if (user) {
        return res.status(400).json({
            message: "An account with this email already exists. Try another email or log in.",
        });
    }

    next();
};

const checkUserExistTrue = async (req, res, next) => {
    const { email } = req.body;

    const users = await usersService.getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(400).json({
            message: "An account with this email doesn't exist. Try another email or sign up.",
        });
    }

    next();
};

module.exports = {
    checkUserExistTrue,
    checkUserExistFalse,
};
