const { Router } = require("express");
const developersController = require("../controllers/developersController");

const developersRouter = Router();

developersRouter.get("/", developersController.getAllDevelopers);

module.exports = developersRouter;
