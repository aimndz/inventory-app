const asyncHandler = require("express-async-handler");
const {isActiveRoute} = require("../public/javascript/helper");
const  buttonsData = require("../public/javascript/constant");

const getAllGames = asyncHandler(async (req, res) => {
  const currentRoute = req.originalUrl.split('?')[0]; 

  res.render("index", {
    title: "Games",
    buttons: buttonsData,
    currentRoute,
    isActiveRoute });
});

module.exports = { getAllGames };
