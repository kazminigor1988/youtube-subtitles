const youtube = require('youtube-dl');

const path          = require('path');
const { promisify } = require('util');
const fs            = require('fs');

const options = {
    auto: false,
    all:  false,
    lang: 'en',
    // todo extract path to config, need creation some dir for avoid conflicts for file with same name
    cwd:  path.join(__dirname, '../../tmp'),
};

class YoutubeVideoSubFileLoader {
    constructor() {
        this._loadSubFileAsync = promisify(youtube.getSubs);
        this._loadOptions      = options;
    }

    /**
     * @param {string} videoLink
     */
    async load(videoLink) {
        let subFilePath;

        try {
            const [subFileName] = await this._loadSubFileAsync(videoLink, this._loadOptions);

            subFilePath = path.join(this._loadOptions.cwd, subFileName);
        } catch (error) {
            console.log(error);
            throw new Error('Can not load subtitle');
        }

        if (!fs.existsSync(subFilePath)) {
            throw new Error('Subtitle file path is not exists');
        }

        return subFilePath;
    }
}

module.exports = YoutubeVideoSubFileLoader;
