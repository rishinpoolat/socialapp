const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const indexRoute = require("./routes/index");
const notificationRoute = require("./routes/notificationRoute");

const app = express();
app.disable("x-powered-by");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/users", userRoute);
app.use("/notifications", notificationRoute);
app.use("/posts", postRoute);
app.use("/", indexRoute);
app.get("*", (req, res) => res.render("error.ejs"));



module.exports = app;
