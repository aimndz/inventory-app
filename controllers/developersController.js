const asyncHandler = require("express-async-handler");
const {isActiveRoute} = require("../public/javascript/helper");
const  buttonsData = require("../public/javascript/constant");

const getAllDevelopers = asyncHandler(async (req, res) => {
  const currentRoute = req.originalUrl.split('?')[0]; 

  res.render("developers", {
    title: "Developers",
    buttons: buttonsData,
    currentRoute,
    isActiveRoute });
});

module.exports = { getAllDevelopers };
