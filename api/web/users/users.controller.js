const bcrypt = require("bcrypt");
const usersService = require("./users.service");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await usersService.getUserById(userId);
        return res.json(user);
    } catch (error) {
        return res.status(404).json({ error: error.message });
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

const register = async (req, res) => {
    const { email, password, name } = req.body;

    const hash = await bcrypt.hash(password, 10);

    try {
        const newUser = await usersService.addUser({
            name,
            email,
            password: hash,
        });
        return res.status(201).json({ user: newUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        return res.json({
            message: "Login successful",
            user: {
                name: req.user.name,
                email: req.user.email,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: "Sorry, something went wrong", error });
    }
};

const logout = (req, res) => {
    try {
        return req.logout((error) => {
            if (error) {
                return res.status(500).json({ message: "Logout failed", error });
            }
            return res.status(200).json({
                message: "logout",
            });
        });
    } catch (error) {
        return res.status(400).json({ message: "Sorry, something went wrong", error });
    }
};

const setTheme = async (req, res) => {
    const { theme } = req.body;

    res.cookie("theme", theme, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.json({ message: `Theme "${theme}" has been saved in cookies` });
};

const getTheme = async (req, res) => {
    const theme = req.cookies.theme;
    res.json({ theme });
};

module.exports = {
    getUserById,
    renderUsers,
    renderUser,
    register,
    setTheme,
    getTheme,
    login,
    logout,
};
