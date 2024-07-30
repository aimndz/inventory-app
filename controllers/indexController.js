const asyncHandler = require("express-async-handler");
const {isActiveRoute} = require("../public/javascript/helper");
const  buttonsData = require("../public/javascript/constant");

const getHomePage = asyncHandler(async (req, res) => {
  const currentRoute = req.originalUrl.split('?')[0]; 

  res.render("index", {
    title: "Summary",
    content: "summary",
    buttons: buttonsData,
    currentRoute,
    isActiveRoute });
});

module.exports = { getHomePage };
