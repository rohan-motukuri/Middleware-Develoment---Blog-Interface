const express = require('express');
const app = express();
const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT | 5000;

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(globalMiddleware);

const statsRoute  = require("./routes/blog-stats.js");
const searchRoute = require("./routes/blog-search");

const statsMiddleware  = require("./middlewares/statsMiddleware");
const searchMiddleware = require("./middlewares/searchMiddleware");

app.get('/api/blog-stats', auth, statsMiddleware, statsRoute);
app.get('/api/blog-search', auth, searchMiddleware, searchRoute);

function globalMiddleware (req, res, next) {
    console.log("@ globalMiddleware");
    next();
}

function auth (req, res, next) {
    console.log("@ auth");
    if(req.headers != "") {
        next();
    }
    else res.send("Non Authenticated");
}

app.listen(port, () => {
    console.log('Server Is Running @ ' + port);
});