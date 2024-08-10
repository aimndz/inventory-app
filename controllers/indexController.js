const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.index = asyncHandler(async (req, res) => {
  const [games, developers, genres, recentGames] = await Promise.all([
    db.getAllGames(),
    db.getAllDevelopers(),
    db.getAllGenres(),
    db.getAllRecentGames(),
  ])

  console.log(recentGames)

  res.render("index", {
    title: "Summary",
    content: "summary",
    games: recentGames,
    games_qty: games.length,
    devs_qty: developers.length,
    genres_qty: genres.length,
  });
});

