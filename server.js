const express = require("express");
const path = require("path");
const port = 3000;

const indexRouter = require("./api/index");

const app = express();

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.engine("pug", require("pug").__express);
app.engine("ejs", require("ejs").__express);

app.use("/", express.json(), indexRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
