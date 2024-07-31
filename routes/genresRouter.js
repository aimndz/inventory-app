const { Router } = require("express");
const genresController = require("../controllers/genresController");

const genresRouter = Router();

// Get all genres
genresRouter.get("/", genresController.index);

// Get genre details 
genresRouter.get("/:genreID", genresController.genre_detail);


module.exports = genresRouter;
