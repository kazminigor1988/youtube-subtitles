const express       = require('express');
const path          = require('path');

const app = express();

app.get('/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, './js/index.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.get('/get', async (req, res) => {
    const videoUrl = req.query.link;

});

app.listen(3000);
