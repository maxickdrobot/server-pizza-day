const express = require("express");

const router = express.Router();

const themeRouter = require("./theme/theme.router");

router.use("/theme", themeRouter);

module.exports = router;
