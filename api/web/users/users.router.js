const express = require("express");

const router = express.Router();
const usersControllers = require("./users.controller");
const usersMiddlewares = require("./user.middleware");
const authMiddlewares = require("../../common/middleware/auth.maiddleware");
const passport = require("passport");

router.get("/views", [authMiddlewares.checkAuth], usersControllers.renderUsers);
router.get("/views/:userId", [authMiddlewares.checkAuth], usersControllers.renderUser);
router.get("/settings/theme", usersControllers.getTheme);
router.post("/settings/theme", [usersMiddlewares.checkThemeExist], usersControllers.setTheme);

router.post("/register", [usersMiddlewares.checkUserExistFalse], usersControllers.register);
router.post("/login", [passport.authenticate("local")], usersControllers.login);
router.get("/logout", usersControllers.logout);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google"), usersControllers.login);

router.get("/:userId", [authMiddlewares.checkAuth], usersControllers.getUserById);
module.exports = router;
