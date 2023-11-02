const axios = require('axios');
const _ = require('lodash');

function main_process (data, res) {
    const totalBlogs = _.size(data);
    const blogWithLongestTitle = _.maxBy(data, blog => blog.title.length);
    const blogsWithPrivacy = _.filter(data, blog => _.includes(blog.title.toLowerCase(), 'privacy')).length;
    const uniqueBlogTitles = _.uniqBy(data, 'title').map(blog => blog.title);

    const analyzedData = {
        totalBlogs,
        blogWithLongestTitle,
        blogsWithPrivacy,
        uniqueBlogTitles
    }

    res.locals.finalResponse = analyzedData; 
}

const statsMiddleware = (req, res, next) => {
    console.log("@ statsMiddleware");
    const url = process.env.url;
    const secret = process.env.secret;

    axios.get(url, { headers: {"x-hasura-admin-secret" : `${secret}`} })
        .then(rawData => {
            const data = rawData.data.blogs;
            main_process(data, res);
            next();
        })
        .catch(err => {
            console.log("Error while fetching data @ statsMiddleware: " + err);
            res.send({
                success : false,
                body: "Error while fetching data @ statsMiddleware: " + err
            });
        });
}

module.exports = statsMiddleware;