const asyncHandler = require("express-async-handler");

const getAllGenres = asyncHandler(async (req, res) => {
  res.render("genres", { title: "Genres" });
});

module.exports = { getAllGenres };
