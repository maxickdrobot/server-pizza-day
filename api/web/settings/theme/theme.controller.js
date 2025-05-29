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
    setTheme,
    getTheme,
};
