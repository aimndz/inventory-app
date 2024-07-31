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
    content: "genres",
    genres: genresData,
   });
});

exports.genre_detail = asyncHandler(async (req, res) => {
  res.render("index", {
    title: req.params.genreID,
    content: "genreDetail",
   });
});

exports.genre_create_get = asyncHandler(async (req, res) => {
  
})


