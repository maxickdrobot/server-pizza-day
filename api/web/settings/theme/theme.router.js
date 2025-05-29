const express = require("express");

const router = express.Router();
const themeMiddlewares = require("./theme.middleware");
const themeControllers = require("./theme.controller");

router.get("/", themeControllers.getTheme);
router.post("/", [themeMiddlewares.checkThemeExist], themeControllers.setTheme);

module.exports = router;
