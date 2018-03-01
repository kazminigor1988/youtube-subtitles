const youtube = require('youtube-dl');

const path          = require('path');
const { promisify } = require('util');

const options = {
    auto: false,
    all:  false,
    lang: 'en',
    cwd:  path.join(__dirname, './tmp'),
};

export default class YoutubeVideoSubFileLoader {
    contructor() {
        this._loadSubFileAsync = promisify(youtube.getSubs);
        this._loadOptions      = options;
    }

    async load(videoLink) {
        const [ subFile ] = await this._loadSubFileAsync(videoLink, options);
    }
}
