const express = require('express');
const path    = require('path');
const config  = require('config');

const app = express();

const { YoutubeVideoSubFileLoader } = require('./services/YoutubeVideoSubFileLoader');
const YoutubeVideoSubFileParser     = require('./services/YoutubeVideoSubFileParser');

const TMP_PATH = config.get('tmp_path');

const youtubeVideoSubFileLoader = new YoutubeVideoSubFileLoader(TMP_PATH);
const youtubeVideoSubFileParser = new YoutubeVideoSubFileParser();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/get', async (req, res) => {
    try {
        const videoUrl = req.query.link;

        const video         = await youtubeVideoSubFileLoader.load(videoUrl);
        const parseSubtitle = await youtubeVideoSubFileParser.parse(video);

        res.status(200).send(parseSubtitle);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.listen(3000);
