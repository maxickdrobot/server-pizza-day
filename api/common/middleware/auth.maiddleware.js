const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT error", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
