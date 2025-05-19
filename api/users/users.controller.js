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
    const { email, password } = req.body;

    const users = await usersService.getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
        {
            email: user.email,
            role: "user",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );

    return res.json({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
};

module.exports = {
    getUserById,
    renderUsers,
    renderUser,
    register,
    login,
};
