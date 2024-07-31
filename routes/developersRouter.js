const { Router } = require("express");
const developersController = require("../controllers/developersController");

const developersRouter = Router();

developersRouter.get("/", developersController.index);

developersRouter.get("/:developerID", developersController.developer_detail);




module.exports = developersRouter;
