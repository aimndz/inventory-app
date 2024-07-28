const asyncHandler = require("express-async-handler");

const getAllGames = asyncHandler(async (req, res) => {
  res.render("games", { title: "Games" });
});

module.exports = { getAllGames };
