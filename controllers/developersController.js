const asyncHandler = require("express-async-handler");

const getAllDevelopers = asyncHandler(async (req, res) => {
  res.render("developers", { title: "Developers" });
});

module.exports = { getAllDevelopers };
