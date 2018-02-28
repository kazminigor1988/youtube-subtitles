const express = require('express');
const path =  require('path');
const { promisify } = require('util');

const youtube =  require('youtube-dl');

const getSubsAcyns = promisify(youtube.getSubs);

const app = express();

app.get('/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, './js/index.js'));
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.get('/get', async (req, res) => {
    const videoUrl = req.query.link;

    const options = {
        // Write automatic subtitle file (youtube only)
        auto: false,
        // Downloads all the available subtitles.
        all: false,
        // Languages of subtitles to download, separated by commas.
        lang: 'en',
        // The directory to save the downloaded files in.
        cwd: __dirname,
    };

    try {
        console.log(videoUrl);
        const subs = await getSubsAcyns(videoUrl, options);
        console.log(subs, 'subs');
        res.send(subs);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


app.listen(3000);
