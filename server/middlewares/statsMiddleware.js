const statsMiddleware = (req, res, next) => {
    next();
}

module.exports = statsMiddleware;