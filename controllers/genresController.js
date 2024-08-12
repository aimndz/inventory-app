const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

// const genresData = [
//   {
//     id: 1,
//     title: "Action",
//     quantity: 12,
//   },
//   {
//     id: 2,
//     title: "Adventure",
//     quantity: 10,
//   },
//   {
//     id: 3,
//     title: "Horror",
//     quantity: 5,
//   }
// ]

exports.index = asyncHandler(async (req, res) => {
  const genresData = await db.getGenreGameCount();

  res.render("index", {
    title: "Genres",
    content: "genre/genres",
    genres: genresData,
   });
});

exports.genre_create_get = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Add New Genre",
    content: "genre/genre_create",
   });
})

exports.genre_create_post = [ 
  body("genre_name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({min: 3})
    .escape(),
  body("genre_name").custom(async (value) => {
    const existingGenre = await db.getGenreByName(value.toLowerCase());

    if(existingGenre.length) {
      throw new Error("Genre name already exists");
    }
  }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render("index", {
        title: "Add New Genre",
        content: "genre/genre_create",
        errors: errors.array()
      })
    }

    const {genre_name} = req.body;
    await db.insertGenre(genre_name);
    console.log(genre_name)
    res.redirect("/genres/create");
  })
];


exports.genre_detail = asyncHandler(async (req, res) => {
  const [genre, allGenreGames] = await Promise.all([
    db.getGenreById(req.params.id),
    db.getGenreGames(req.params.id)
  ])

  res.render("index", {
    title: genre[0].name,
    id: req.params.id,
    content: "genre/genre_detail",
    games: allGenreGames,
    quantity: allGenreGames.length,
   });
});

exports.genre_update_get = asyncHandler(async (req, res) => {
  const genre = await db.getGenreById(req.params.id);
  
  res.render("index", {
    title: `Update ${genre[0].name}`,
    id: genre[0].id,
    name: genre[0].name,
    content: "genre/genre_update",
  });
})

exports.genre_update_post = [ 
  body("genre_name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({min: 3})
    .escape(),
  body("genre_name").custom(async (value) => {
    const existingGenre = await db.getGenreByName(value.toLowerCase());

    if(existingGenre.length) {
      throw new Error("Genre name already exists");
    }
  }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render("index", {
        title: "Add New Genre",
        content: "genre/genre_create",
        errors: errors.array()
      })
    }
    const genre_id = req.params.id;
    const {genre_name} = req.body;
  
    await db.updateGenre(genre_id, genre_name);
  
    res.redirect(`/genres/${req.params.id}/update`);
  })
];

exports.genre_delete_get = asyncHandler(async (req, res) => {
  const genre = await db.getGenreById(req.params.id);

  res.render("index", {
    title: `${genre[0].name}`,
    content: "genre/genre_delete",
    id: req.params.id,
    genre: genre[0],
   });
})

exports.genre_delete_post = asyncHandler(async (req, res) => {
  await db.deleteGenreById(req.params.id);

  res.redirect("/genres");
})