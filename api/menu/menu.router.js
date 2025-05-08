const express = require("express");

const router = express.Router();
const menuController = require("./menu.controller");

router.get("/", menuController.getPizzasList);

module.exports = router;
