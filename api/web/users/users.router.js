const express = require("express");

const router = express.Router();
const usersControllers = require("./users.controller");
const usersMiddlewares = require("./user.middleware");
const authMiddlewares = require("../../common/middleware/auth.maiddleware");

router.get("/views", usersControllers.renderUsers);
router.get("/views/:userId", usersControllers.renderUser);
router.get("/:userId", [authMiddlewares.checkAuth], usersControllers.getUserById);

router.post("/register", [usersMiddlewares.checkUserExistFalse], usersControllers.register);
router.post("/login", [usersMiddlewares.checkUserExistTrue], usersControllers.login);
router.post("/logout", usersControllers.logout);

module.exports = router;
