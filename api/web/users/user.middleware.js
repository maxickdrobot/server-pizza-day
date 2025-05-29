const usersService = require("./users.service");
const jwt = require("jsonwebtoken");

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

    req.foundUser = user;

    next();
};

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        console.log("Users token: " + decoded);

        if (!decoded) return res.status(401).json({ message: "Unauthorized" });
        if (!decoded.iss || decoded.iss !== expectedIssuer) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const checkThemeExist = async (req, res, next) => {
    const { theme } = req.body;
    if (!theme) {
        res.status(400).json({ message: "Theme not specified" });
    }
    next();
};

module.exports = {
    checkUserExistTrue,
    checkUserExistFalse,
    validateToken,
    checkThemeExist,
};
