const express = require('express');
const path    = require('path');
const config  = require('config');

const app = express();

const YoutubeVideoSubFileLoader = require('./services/YoutubeVideoSubFileLoader');

const tmpPath                   = config.get('tmp_path');
const youtubeVideoSubFileLoader = new YoutubeVideoSubFileLoader(tmpPath);

// todo change way for web files
app.get('/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../js/index.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/get', async (req, res) => {
    try {
        const videoUrl = req.query.link;

        const subFilePath = await youtubeVideoSubFileLoader.load(videoUrl);

        res.status(200).send(subFilePath);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(3000);
