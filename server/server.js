const express = require('express');
const app = express();

app.get('/api/blog-stats', (req, res) => {
    
});

app.listen(3001, () => {
    console.log('Server Is Running');
});