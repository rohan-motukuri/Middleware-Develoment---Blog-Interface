const statsRoute = (req, res) => {
    console.log("@ blog-stats route")

    console.log(res.locals.finalResponse);
};

module.exports = statsRoute;