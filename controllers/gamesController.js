const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Games",
    content: "game/games",
  });
});

exports.game_create_get = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Add New Game",
    content: "game/game_create",
   });
})

exports.game_detail = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Add New Game",
    content: "game/game_details",
  });
})

exports.game_create_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.game_update_get = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.game_update_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.game_delete_get = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.game_delete_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})
