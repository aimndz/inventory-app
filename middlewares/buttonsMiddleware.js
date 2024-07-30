const buttonsData = require("../public/javascript/constant");

const buttonsMiddleware = (req, res, next) => {
    res.locals.buttons = buttonsData;
    next();
}

module.exports = {buttonsMiddleware};