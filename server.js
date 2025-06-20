const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);

const indexRouter = require("./api/index");

const app = express();

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.engine("pug", require("pug").__express);
app.engine("ejs", require("ejs").__express);

app.use(cookieParser());

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    })
);

const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log("DB is conected");
    })
    .catch((err) => {
        console.error("Error", err);
    });

app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.json(), indexRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
