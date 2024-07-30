const asyncHandler = require("express-async-handler");

const getAllGenres = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Genres",
    content: "genres",
   });
});

module.exports = { getAllGenres };
