const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const genresRouter = require("./routes/genresRouter");
const gamesRouter = require("./routes/gamesRouter");
const developersRouter = require("./routes/developersRouter");

const app = express();

app.use("/", indexRouter);
app.use("/genres", genresRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
