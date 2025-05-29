const express = require("express");

const router = express.Router();

const webRouter = require("./web/index");

router.use("/web", webRouter);

module.exports = router;
