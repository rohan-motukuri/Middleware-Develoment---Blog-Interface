const statsRoute = (req, res) => {
    console.log("@ blog-stats route")

    res.send({
        success: true,
        body: res.locals.finalResponse
    });
};

module.exports = statsRoute;