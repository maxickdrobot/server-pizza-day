const usersService = require("./users.service");
const jwt = require("jsonwebtoken");

const checkUserExistFalse = async (req, res, next) => {
    const { email } = req.body;

    const user = await usersService.getUserByEmail(email);

    if (user) {
        return res.status(400).json({
            message: "An account with this email already exists. Try another email or log in.",
        });
    }

    next();
};

const checkThemeExist = async (req, res, next) => {
    const { theme } = req.body;
    if (!theme) {
        res.status(400).json({ message: "Theme not specified" });
    }
    next();
};

module.exports = {
    checkUserExistFalse,
    checkThemeExist,
};
