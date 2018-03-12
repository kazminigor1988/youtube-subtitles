const youtube = require('youtube-dl');

const path          = require('path');
const fs            = require('fs');
const { promisify } = require('util');

class YoutubeVideoSubFileLoader {
    /**
     * @param {string} tmpPath
     * @throws {TypeError}
     */
    constructor(tmpPath) {
        if (typeof tmpPath !== 'string') {
            throw new TypeError('tmpPath should be a string')
        }

        this._loadSubFileAsync = promisify(youtube.getSubs);
        this._loadOptions      = {
            cwd:  tmpPath,
            auto: false,
            all:  false,
            lang: 'en',
        };
    }

    /**
     * @param {string} videoLink
     * @returns {string}
     * @throws {Error}
     */
    async load(videoLink) {
        let subFilePath;

        try {
            const [subFileName] = await this._loadSubFileAsync(videoLink, this._loadOptions);

            subFilePath = path.join(this._loadOptions.cwd, subFileName);
        } catch (error) {
            throw new Error('Can not load subtitle');
        }

        if (!fs.existsSync(subFilePath)) {
            throw new Error(`Subtitle file path is not exists: ${subFilePath}`);
        }

        return subFilePath;
    }
}

module.exports = YoutubeVideoSubFileLoader;
