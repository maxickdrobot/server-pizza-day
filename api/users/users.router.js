const express = require("express");

const router = express.Router();
const usersControllers = require("./users.controller");

router.post("/", usersControllers.addUser);
router.get("/:userId", usersControllers.getUserById);

module.exports = router;
