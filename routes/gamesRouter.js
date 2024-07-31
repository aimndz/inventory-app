const { Router } = require("express");
const gamesController = require("../controllers/gamesController");

const gamesRouter = Router();

// GET request for games home page.
gamesRouter.get("/", gamesController.index);

// GET request for game detail.
gamesRouter.get("/:id", gamesController.game_detail);

// GET request for game create page.
gamesRouter.get("/create", gamesController.game_create_get);

// POST request game create page.
gamesRouter.post("/create", gamesController.game_create_post);

// GET request game update page.
gamesRouter.get("/:id/update", gamesController.game_update_get);

// POST request game update page.
gamesRouter.post("/:id/update", gamesController.game_update_post);

// GET request game delete page.
gamesRouter.get("/:id/delete", gamesController.game_delete_get);

// POST request game delete page.
gamesRouter.post("/:id/delete", gamesController.game_delete_post);

module.exports = gamesRouter;
