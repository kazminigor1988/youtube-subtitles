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

app.get('/get', (req, res) => {
    const videoUrl = req.param('video');

    try {
        const subs = getSubsAcyns(videoUrl);

        res.send(subs);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


app.listen(3000);
