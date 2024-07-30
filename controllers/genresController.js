const asyncHandler = require("express-async-handler");
const {isActiveRoute} = require("../public/javascript/helper");

const getAllGenres = asyncHandler(async (req, res) => {
  const currentRoute = req.originalUrl.split('?')[0]; 

  const buttonsData = [
    { text: "Summary", route: "/" },
    { text: "Games", route: "/games" },
    { text: "Genres", route: "/genres" },
    { text: "Developers", route: "/developers" }
  ];


  res.render("genres", {
    title: "Genres",
    buttons: buttonsData,
    currentRoute,
    isActiveRoute });
});

module.exports = { getAllGenres };
