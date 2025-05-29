const express = require("express");

const router = express.Router();

const menuRouter = require("./menu/menu.router");
const ordersRouter = require("./orders/orders.router");
const usersRouter = require("./users/users.router");
const settingsRouter = require("./settings/index");

router.use("/menu", menuRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);
router.use("/settings", settingsRouter);

module.exports = router;
