const searchMiddleware = (req, res, next) => {
    console.log("here")
    next();
}

module.exports = searchMiddleware;