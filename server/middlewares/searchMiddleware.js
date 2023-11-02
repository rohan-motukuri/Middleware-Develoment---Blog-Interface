const axios = require('axios');
const _ = require('lodash');

function main_process (data, req, res, next) {
    console.log(req.query)
    if(req?.query?.query) {
        const query = req.query.query;
        const normalizedQuery =  query.toLowerCase();

        const matchedBlogs = _.filter(data, blog => _.includes(blog.title.toLowerCase(), normalizedQuery));

        res.locals.matchedBlogs = matchedBlogs; 
        next();
    } else {
        console.log("Error @ searchMiddleware : " + "No search query provided")
        res.send ({
            success : false,
            body: "No search query provided"
        })
    }
}

const statsMiddleware = (req, res, next) => {
    console.log("@ searchMiddleware");
    const url = process.env.url;
    const secret = process.env.secret;

    axios.get(url, { headers: {"x-hasura-admin-secret" : `${secret}`} })
        .then(rawData => {
            const data = rawData.data.blogs;
            main_process(data, req, res, next);
        })
        .catch(err => {
            console.log("Error while fetching data @ searchMiddleware: " + err);
            res.send({
                success : false,
                body: "Error while fetching data @ searchMiddleware: " + err
            });
        });
}

module.exports = statsMiddleware;