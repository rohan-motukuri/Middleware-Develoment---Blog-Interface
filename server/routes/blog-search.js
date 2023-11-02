const statsRoute = (req, res) => {
    console.log("@ blog-search route")
    res.send({
        success:true,
        body: res.locals.matchedBlogs
    });
};

module.exports = statsRoute;