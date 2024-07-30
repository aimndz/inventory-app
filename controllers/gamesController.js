const asyncHandler = require("express-async-handler");

const getAllGames = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Games",
    content: "games",
  });
});

module.exports = { getAllGames };
