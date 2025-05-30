module.exports.checkAuth = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Please login or singin" });
    next();
};
