const youtube = require('youtube-dl');

const path          = require('path');
const fs            = require('fs');
const { promisify } = require('util');

const type = {
    AUTO   : 1,
    DEFAULT: 2
};

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
        this._tmpPath          = tmpPath;
        this._lang             = 'en';
    }

    /**
     * @param {string} videoLink
     * @returns {string}
     * @throws {Error}
     */
    async load(videoLink) {
        try {
            let type = type.DEFAULT;
            let path = await this._tryLoadDefaultSub(videoLink);

            if (!path) {
                type = type.AUTO;
                path = await this._tryLoadAutoSub(videoLink);
            }

            return {
                path,
                type
            };
        } catch (error) {
            throw new Error(`Can not load subtitle: ${error.message}`);
        }
    }

    /**
     * @param {string} videoLink
     * @returns {string}
     * @private
     */
    async _tryLoadAutoSub(videoLink) {
        const options = this._createOptions({ auto: true });

        const [fileName] = await this._loadSubFileAsync(videoLink, options);

        return fileName;
    }

    /**
     * @param auto
     * @returns {{}}
     * @private
     */
    _createOptions({ auto = false } = {}) {
        return {
            auto,
            cwd : this._tmpPath,
            lang: this._lang,
        };
    }

    /**
     * @param {string} videoLink
     * @returns {string}
     * @private
     */
    async _tryLoadDefaultSub(videoLink) {
        const options = this._createOptions();

        const [fileName] = await this._loadSubFileAsync(videoLink, options);

        return fileName;
    }
}

module.exports = {
    YoutubeVideoSubFileLoader,
    type
};
