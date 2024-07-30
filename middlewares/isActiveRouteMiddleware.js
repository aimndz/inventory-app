// middlewares/isActiveRouteMiddleware.js
const { isActiveRoute } = require("../public/javascript/helper");

const isActiveRouteMiddleware = (req, res, next) => {
    res.locals.isActiveRoute = isActiveRoute; 
    next();
};

module.exports = {isActiveRouteMiddleware };
