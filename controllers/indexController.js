const asyncHandler = require("express-async-handler");

const getHomePage = asyncHandler(async (req, res) => {
  res.render("index", { title: "Home Page" });
});

module.exports = { getHomePage };
