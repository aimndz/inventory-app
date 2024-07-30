const asyncHandler = require("express-async-handler");
const {isActiveRoute} = require("../public/javascript/helper");
const  buttonsData = require("../public/javascript/constant");

const getAllGenres = asyncHandler(async (req, res) => {
  const currentRoute = req.originalUrl.split('?')[0]; 

  res.render("genres", {
    title: "Genres",
    buttons: buttonsData,
    currentRoute,
    isActiveRoute });
});

module.exports = { getAllGenres };
