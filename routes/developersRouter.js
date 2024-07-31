const { Router } = require("express");
const developersController = require("../controllers/developersController");

const developersRouter = Router();

// GET developers page.
developersRouter.get("/", developersController.index);

// GET developers detail.
developersRouter.get("/:id", developersController.developer_detail);

// GET for creating developer.
developersRouter.get("/create", developersController.developer_create_get);

// POST for creating developer.
developersRouter.post("/create", developersController.developer_create_post);

// GET for updating developer.
developersRouter.get("/:id/update", developersController.developer_update_get);

// POST for updating developer.
developersRouter.post("/:id/update", developersController.developer_update_post);

// GET for deleting developer.
developersRouter.get("/:id/delete", developersController.developer_delete_get);

// POST for deleting developer.
developersRouter.post("/:id/delete", developersController.developer_delete_post);

module.exports = developersRouter;
