const LOAD_TIMEOUT = 3000;

/**
 * @param {string} url
 * @params {number} [loadTimeout]
 * @returns {Promise}
 * @throws {TypeError}
 */
export default function loadScript(url, loadTimeout = LOAD_TIMEOUT) {
    if (typeof url !== 'string' || url.length === 0) {
        throw new TypeError('url should be a not empty string');
    }

    if (isNaN(loadTimeout) || typeof loadTimeout !== 'number') {
        throw new TypeError('loadTimeout should be a number');
    }

    return new Promise((resolve, reject) => {
        const link = document.createElement('script');

        link.defer = true;
        link.setAttribute("src", url);

        document.head.appendChild(link);

        const rejectTimeout = setTimeout(() => {
            document.head.removeChild(link);

            reject(new Error(`Can not load script with timeout ${loadTimeout}: ${link}`));
        }, loadTimeout);

        link.onload = () => {
            clearTimeout(rejectTimeout);

            resolve();
        };
    });
}
