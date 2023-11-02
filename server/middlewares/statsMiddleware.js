const axios = require('axios');
const _ = require('lodash');

const statsMiddleware = (req, res, next) => {
    console.log("@ statsMiddleware");
    const url = process.env.url;
    const secret = process.env.secret;

    axios.get(url, { headers: {"x-hasura-admin-secret" : `${secret}`} })
        .then(rawData => {
            const data = rawData.data.blogs;

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
            next();
        })
        .catch(err => {
            console.log("Error while fetching data @ statsMiddleware: " + err);
            res.send("Error while fetching data");
        });
}

module.exports = statsMiddleware;