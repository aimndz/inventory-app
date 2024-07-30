const asyncHandler = require("express-async-handler");

const getAllDevelopers = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Developers",
    content: "developers",
   });
});

module.exports = { getAllDevelopers };
