const express = require("express");

const router = express.Router();
const menuController = require("./menu.controller");

router.get("/", menuController.getPizzasList);
router.get("/views", menuController.renderMenu);
router.get("/views/:pizzaId", menuController.renderPizza);

module.exports = router;
