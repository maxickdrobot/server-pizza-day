const checkThemeExist = async (req, res, next) => {
    const { theme } = req.body;
    if (!theme) {
        res.status(400).json({ message: "Theme not specified" });
    }
    next();
};

module.exports = {
    checkThemeExist,
};
