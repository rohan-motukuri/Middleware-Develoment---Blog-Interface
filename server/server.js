const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(middleware);

const statsRoute  = require("./routes/blog-stats");
const searchRoute = require("./routes/blog-search");

const statsMiddleware = require("./middlewares/statsMiddleware");
const searchMiddleware = require("./middlewares/searchMiddleware");

app.get('/api/blog-stats', auth, statsRoute);
app.get('/api/blog-search', auth, searchRoute);

function middleware (req, res, next) {
    console.log("AT Global MIDDLE WARE");
    next();
}

function auth (req, res, next) {
    console.log("At Auth")
    next();
}

app.listen(5000, () => {
    console.log('Server Is Running');
});