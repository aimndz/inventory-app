const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.index = asyncHandler(async (req, res) => {
  const [games, developers, genres] = await Promise.all([
    db.getAllGames(),
    db.getAllDevelopers(),
    db.getAllGenres()
  ])

  res.render("index", {
    title: "Summary",
    content: "summary",
    games: games,
    games_qty: games.length,
    devs_qty: developers.length,
    genres_qty: genres.length,
  });
});

