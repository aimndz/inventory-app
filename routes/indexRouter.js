const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

// GET request for home page.
indexRouter.get("/", indexController.index);

module.exports = indexRouter;
