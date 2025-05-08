const express = require("express");

const router = express.Router();

const menuRouter = require("./menu/menu.router");
const ordersRouter = require("./orders/orders.router");
const usersRouter = require("./users/users.router");

router.use("/menu", menuRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);

module.exports = router;
