const fs            = require('fs');
const { promisify } = require('util');
const { EOL }       = require('os');

const { TYPE } = require('./YoutubeVideoSubFileLoader');

class YoutubeVideoSubFileParser {
    constructor() {
        this._readFileAsync = promisify(fs.readFile);
        this._fileEncoding  = 'utf8';
    }

    /**
     * @param {string} path
     * @param {string} type
     * @return {{}}
     * @throws {Error}
     */
    async parse({ path, type }) {
        console.log('parse');
        if (!fs.existsSync(path)) {
            throw new Error(`Subtitle file path is not exists: ${path}`);
        }

        const content = await this._readFileAsync(path, this._fileEncoding);

        if (TYPE.DEFAULT === type) {
            return this._parseDefaultContent(content);
        } else {
            return this._parseAutoContent(content);
        }
    }

    /**
     * @param {string} content
     * @private
     */
    _parseDefaultContent(content) {
        const splittedContent            = content.split(EOL);
        const splittedContentWithoutHead = this._removeHeadString(splittedContent);

        let key;

        return splittedContentWithoutHead.reduce((acc, string) => {
            if (this._isTimeString(string)) {
                key = string;
            } else {
                acc[key] = acc[key] ? `${acc[key]} ${string}` : string;
            }

            return acc;
        }, {});
    }

    /**
     * @param {[]} splittedContent
     * @return {[]}
     * @private
     */
    _removeHeadString(splittedContent) {
        while (!this._isTimeString(splittedContent[0])) {
            splittedContent.shift();
        }

        return splittedContent;
    }

    /**
     * @param {string} string
     * @return {boolean}
     * @private
     */
    _isTimeString(string) {
        return /^\d{2}:\d{2}:\d{2}.\d{3} --> \d{2}:\d{2}:\d{2}.\d{3}/.test(string);
    }

    _parseAutoContent(content) {
        const splittedContent            = content.split(EOL);
        const splittedContentWithoutHead = this._removeHeadString(splittedContent);

        let key;

        return splittedContentWithoutHead.reduce((acc, string) => {
            if (string.length === 0) {
                return acc;
            }

            if (this._isTimeString(string)) {
                key = string.slice(0, 29);
            } else {
                const clearedString = string.replace(/<[\w./:]*>/gi, '');
                acc[key]      = acc[key] ? `${acc[key]} ${clearedString}` : clearedString;
            }

            return acc;
        }, {})
    }

    async test(acc, string) {

    }
}

module.exports = YoutubeVideoSubFileParser;
