import WATCH_TYPE from '../WATCH_TYPE';

export default class SubtitleWatchTypeMarker {
    /**
     * @param {[]} subtitles
     * @param {number} currentTime
     */
    mark(subtitles, currentTime) {
        return subtitles.map(item => {
            if (item.from < currentTime && item.to < currentTime) {
                item.watchType = WATCH_TYPE.WATCHED;
            } else if (item.from < currentTime && item.to > currentTime) {
                item.watchType = WATCH_TYPE.WATCHING;
            } else {
                item.watchType = WATCH_TYPE.NOT_WATCHED;
            }

            return item;
        });
    }
}