const express = require('express');
const path    = require('path');
const config  = require('config');

const app = express();

const YoutubeVideoSubFileLoader = require('./services/YoutubeVideoSubFileLoader');
const YoutubeVideoSubFileParser = require('./services/YoutubeVideoSubFileParser');

const tmpPath = config.get('tmp_path');

const youtubeVideoSubFileLoader = new YoutubeVideoSubFileLoader(tmpPath);
const youtubeVideoSubFileParser = new YoutubeVideoSubFileParser();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/get', async (req, res) => {
    try {
        const videoUrl = req.query.link;

        const subFilePath   = await youtubeVideoSubFileLoader.load(videoUrl);
        const parseSubtitle = await youtubeVideoSubFileParser.parse(subFilePath);

        res.status(200).send(parseSubtitle);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.listen(3000);
