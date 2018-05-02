const FIRST_POSITION_FROM = 0;
const LAST_POSITION_FROM  = 12;

const FIRST_POSITION_TO = 17;
const LAST_POSITION_TO  = 29;

const SECONDS_IN_ONE_HOURS  = 60 * 60;
const SECONDS_IN_ONE_MINUTE = 60;

export default class SubtitleParser {
    /**
     * @param {{}} subtitles
     */
    parse(subtitles) {
        return Object.keys(subtitles).reduce((acc, time) => {
            const text = subtitles[time];

            const from = time.slice(FIRST_POSITION_FROM, LAST_POSITION_FROM);
            const to   = time.slice(FIRST_POSITION_TO, LAST_POSITION_TO);

            acc.push({
                text,
                from: this._parseTime(from),
                to  : this._parseTime(to),
            });

            return acc;
        }, []);
    }

    /**
     * @param {string} time
     * @returns {number}
     * @private
     */
    _parseTime(time) {
        const [hours, minutes, seconds] = time.slice(0, 8).split(':');
        const milliseconds              = time.slice(8, 11);

        return Number(hours) * SECONDS_IN_ONE_HOURS
            + Number(minutes) * SECONDS_IN_ONE_MINUTE
            + Number(seconds)
            + parseFloat(milliseconds);
    }
}