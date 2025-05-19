const express = require("express");

const router = express.Router();
const usersControllers = require("./users.controller");
const usersMiddlewares = require("./user.middleware");

router.get("/views", usersControllers.renderUsers);
router.get("/views/:userId", usersControllers.renderUser);
router.get("/:userId", usersControllers.getUserById);

router.post("/register", [usersMiddlewares.checkUserExistFalse], usersControllers.register);
router.post("/login", usersControllers.login);

module.exports = router;
