const asyncHandler = require("express-async-handler");

const genresData = [
  {
    id: 1,
    title: "Action",
    quantity: 12,
  },
  {
    id: 2,
    title: "Adventure",
    quantity: 10,
  },
  {
    id: 3,
    title: "Horror",
    quantity: 5,
  }
]

exports.index = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Genres",
    content: "genre/genres",
    genres: genresData,
   });
});

exports.genre_detail = asyncHandler(async (req, res) => {
  res.render("index", {
    title: req.params.id,
    content: "genre/genre_detail",
   });
});

exports.genre_create_get = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.genre_create_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.genre_update_get = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.genre_update_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.genre_delete_get = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})

exports.genre_delete_post = asyncHandler(async (req, res) => {
  // NOT YET IMPLEMENTED
})