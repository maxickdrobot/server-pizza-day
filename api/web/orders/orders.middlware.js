const checkNewData = (req, res, next) => {
    const { newData } = req.body;
    if (newData) {
        return next();
    }
    return res.status(400).json({ error: "New data is required!!!" });
};

module.exports = {
    checkNewData,
};
