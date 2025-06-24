const express = require("express");

const router = express.Router();
const orderController = require("./orders.controller");
const orderMiddlware = require("./orders.middlware");

router.post("/", orderController.addOrder);
router.get("/:userId", orderController.getOrdersByUserId);
router.put("/:orderId", [orderMiddlware.checkNewData], orderController.updateOrder);
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
