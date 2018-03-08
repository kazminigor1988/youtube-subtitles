const express       = require('express');
const path          = require('path');

const app = express();

const YoutubeVideoSubFileLoader = require('./services/YoutubeVideoSubFileLoader');

// todo change way for web files
app.get('/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../js/index.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/get', async (req, res) => {
    const videoUrl = req.query.link;

    const youtubeVideoSubFileLoader = new YoutubeVideoSubFileLoader();

    const subFilePath = youtubeVideoSubFileLoader.load(videoUrl);

    res.status(200).send(result);
});

app.listen(3000);
