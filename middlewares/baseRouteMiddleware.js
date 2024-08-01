const baseRouteMiddleware = (req, res, next) => {
    const routes = ['/games', '/genres', '/developers'];
    const originalUrl = req.originalUrl.split('?')[0]; 

    const matchedRoute = routes.find(route => originalUrl.startsWith(route)) || '/';

    res.locals.currentRoute = matchedRoute;
    next();
};

module.exports = {baseRouteMiddleware};