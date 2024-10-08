const express = require("express");
const path = require("path");
require('dotenv').config();

const indexRouter = require("./routes/indexRouter");
const genresRouter = require("./routes/genresRouter");
const gamesRouter = require("./routes/gamesRouter");
const developersRouter = require("./routes/developersRouter");

const {buttonsMiddleware} = require("./middlewares/buttonsMiddleware");
const {isActiveRouteMiddleware} = require("./middlewares/isActiveRouteMiddleware");
const {baseRouteMiddleware} = require("./middlewares/baseRouteMiddleware");

const app = express();

// Sidebar buttons Middleware
app.use(buttonsMiddleware);
app.use(isActiveRouteMiddleware);
app.use(baseRouteMiddleware);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/genres", genresRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
