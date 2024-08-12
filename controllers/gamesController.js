const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const fs = require("fs");
const path = require("path");
const {body, validationResult} = require("express-validator");

exports.index = asyncHandler(async (req, res) => {
  const games = await db.getAllGames();

  res.render("index", {
    title: "Games",
    content: "game/games",
    games: games,
  });
});

exports.game_create_get = asyncHandler(async (req, res) => {
  const [genres, developers] = await Promise.all([
    db.getAllGenres(),
    db.getAllDevelopers(),
  ]) 

  res.render("index", {
    title: "Add New Game",
    content: "game/game_create",
    genres: genres,
    developers: developers
   });
})

exports.game_detail = asyncHandler(async (req, res) => {
  const game = await db.getGamesById(req.params.id);

  res.render("index", {
    title: "Add New Game",
    id: req.params.id,
    content: "game/game_details",
    game: game[0]
  });
})

exports.game_create_post = [
  body("game_name")
    .trim()
    .notEmpty().withMessage("Game name should not be empty"),
  body("release_date")
    .notEmpty().withMessage("Release date should not be empty")
    .custom(value => {
      // Parsing and format check
      const parts = value.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
      const day = parseInt(parts[2], 10);
      
      const date = new Date(year, month, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
      ) {
        throw new Error('Invalid date format (YYYY-MM-DD)');
      }

      // Range check 
      const today = new Date();
      if (date > today) {
        throw new Error('Release date cannot be in the future');
      }

      return true;
    }),
  body("developer")
    .isArray({min: 1}).withMessage("Please select at least one developer"),
  body("genre")
    .isArray({min: 1}).withMessage("Please select at least one genre"),
  body("description")
    .notEmpty().withMessage("Description should not be empty")
    .isLength({max: 300}).withMessage("Description exceeds the maximum character limit"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty){
      return res.status(400).render("index", {
        title: "Add New Game",
        content: "game/game_create",
        errors: errors.array()
      })
    }

    const {game_name, image, release_date,  developer, genre, description} = req.body;

    // Convert developers and genres into an array
    const genre_Array = Array.isArray(genre) ? genre : [genre];
    const developer_Array = Array.isArray(developer) ? developer : [developer];
    
    const imagePath = path.join(__dirname, '..', 'public', 'images', image); 
    const imageBuffer = fs.readFileSync(imagePath); // Read the file directly into a buffer

    await db.insertGame(game_name, imageBuffer, release_date, developer_Array, genre_Array, description);

    res.redirect("/games/create");
  })
]

exports.game_update_get = asyncHandler(async (req, res) => {
  const [game, genres, developers] = await Promise.all([
    db.getGamesById(req.params.id),
    db.getAllGenres(),
    db.getAllDevelopers(),
  ]) 


  const release_date =  game[0].release_date;
  const formatted_date = new Date(release_date.getTime() + release_date.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);

  console.log("AFTER UPDATE: " + release_date)

  res.render("index", {
    title: `Update ${game[0].name}`,
    content: "game/game_update",
    id: req.params.id,
    game: game[0],
    formatted_date: formatted_date,
    genres: genres,
    developers: developers
   });
})

exports.game_update_post =  [
  body("game_name")
    .trim()
    .notEmpty().withMessage("Game name should not be empty"),
  body("release_date")
    .notEmpty().withMessage("Release date should not be empty")
    .custom(value => {
      // Parsing and format check
      const parts = value.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JS
      const day = parseInt(parts[2], 10);
      
      const date = new Date(year, month, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
      ) {
        throw new Error('Invalid date format (YYYY-MM-DD)');
      }

      // Range check 
      const today = new Date();
      if (date > today) {
        throw new Error('Release date cannot be in the future');
      }

      return true;
    }),
  body("developer")
    .isArray({min: 1}).withMessage("Please select at least one developer"),
  body("genre")
    .isArray({min: 1}).withMessage("Please select at least one genre"),
  body("description")
    .notEmpty().withMessage("Description should not be empty")
    .isLength({max: 300}).withMessage("Description exceeds the maximum character limit"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty){
      return res.status(400).render("index", {
        title: "Add New Game",
        content: "game/game_create",
        errors: errors.array()
      })
    }

    const {game_name, release_date,  developer, genre, description} = req.body;

    // Convert developers and genres into an array
    const genre_Array = Array.isArray(genre) ? genre : [genre];
    const developer_Array = Array.isArray(developer) ? developer : [developer];
    const formatted_Date = new Date(release_date); 

    console.log("BEFORE update:", formatted_Date);

    await db.updateGame(game_name, formatted_Date, developer_Array, genre_Array, description, req.params.id);

    res.redirect(`/games/${req.params.id}/update`);
  })
]

exports.game_delete_get = asyncHandler(async (req, res) => {
  const game = await db.getGamesById(req.params.id);


  res.render("index", {
    title: `${game[0].name}`,
    content: "game/game_delete",
    id: req.params.id,
    game: game[0],
   });
})

exports.game_delete_post = asyncHandler(async (req, res) => {
  await db.deleteGameById(req.params.id);

  res.redirect("/games");
})
