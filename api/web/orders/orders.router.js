const express = require("express");

const router = express.Router();
const orderController = require("./orders.controller");

router.post("/", orderController.addOrder);

router.get("/:userId", orderController.getOrdersByUserId);

module.exports = router;
