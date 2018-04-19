const fs            = require('fs');
const { promisify } = require('util');
const { EOL }       = require('os');



class YoutubeVideoSubFileParser {
    constructor() {
        this._readFileAsync = promisify(fs.readFile);
        this._fileEncoding  = 'utf8';
    }

    /**
     * @param {string} filePath
     * @return {{}}
     */
    async parse({ path, type }) {
        if (!fs.existsSync(path)) {
            throw new Error(`Subtitle file path is not exists: ${path}`);
        }

        const content = await this._readFileAsync(path, this._fileEncoding);

        if (type.DEFAULT === type) {
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
        const splittedContentWithoutHead = this.__removeHeadString(splittedContent);

        return this._timeTextMapCreate(splittedContentWithoutHead);
    }

    /**
     * @param {[]} splittedContent
     * @return {[]}
     * @private
     */
    __removeHeadString(splittedContent) {
        while(!this._isTimeString(splittedContent[0])) {
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
        return /^\d{2}:\d{2}:\d{2}.\d{3} --> \d{2}:\d{2}:\d{2}.\d{3}$/.test(string);
    }

    /**
     * @param {[]} content
     * @return {{}}
     * @private
     */
    _timeTextMapCreate(content) {
        let key;

        return content.reduce((acc, string) => {
            if (this._isTimeString(string)) {
                key = string;
            } else {
                acc[key] = acc[key] ? `${acc[key]} ${string}` : string;
            }

            return acc;
        }, {});
    }

    _parseAutoContent(content) {

    }
}

module.exports = YoutubeVideoSubFileParser;
