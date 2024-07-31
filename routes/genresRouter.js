const { Router } = require("express");
const genresController = require("../controllers/genresController");

const genresRouter = Router();

// Get all genres
genresRouter.get("/", genresController.index);

// Get genre details 
genresRouter.get("/:id", genresController.genre_detail);

// GET request for genre detail.
genresRouter.get("/:id", genresController.genre_detail);

// GET request for genre create page.
genresRouter.get("/create", genresController.genre_create_get);

// POST request genre create page.
genresRouter.post("/create", genresController.genre_create_post);

// GET request genre update page.
genresRouter.get("/:id/update", genresController.genre_update_get);

// POST request genre update page.
genresRouter.post("/:id/update", genresController.genre_update_post);

// GET request genre delete page.
genresRouter.get("/:id/delete", genresController.genre_delete_get);

// POST request genre delete page.
genresRouter.post("/:id/delete", genresController.genre_delete_post);


module.exports = genresRouter;
