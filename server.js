const express = require("express");
const port = 3000;

const indexRouter = require("./api/index");

const app = express();

app.use("/", express.json(), indexRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
