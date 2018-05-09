export default class ScrollToWatchingSubtitle {
    constructor(parentElement, watchingBlockClass) {
        if (!(parentElement instanceof HTMLElement)) {
            throw new TypeError('parentElement should be a HTMLElement');
        }

        if (typeof watchingBlockClass !== 'string' || watchingBlockClass.length === 0) {
            throw new TypeError('watchingBlockClass should be a not empty string');
        }

        this._parentEl                 = parentElement;
        this._pxToMiddleParentEl       = this._parentEl.clientHeight / 2;
        this._watchingBlockClass       = watchingBlockClass;
        this._tryScrollInterval        = undefined;
        this._tryScrollIntervalTimeout = 1000;
    }

    start() {
        this._tryScrollInterval = setInterval(() => this._tryScroll(), this._tryScrollIntervalTimeout);
    }

    stop() {
        clearInterval(this._tryScrollInterval);
    }

    _tryScroll() {
        const watchingEl      = this._parentEl.querySelector(`.${this._watchingBlockClass}`);
        const parentScrollTop = this._parentEl.scrollTop;

        if (watchingEl && watchingEl.offsetTop - this._pxToMiddleParentEl > parentScrollTop) {
            console.log(watchingEl.offsetTop);

            const scrollY = watchingEl.offsetTop - this._pxToMiddleParentEl;
            console.log(scrollY);
            this._parentEl.scrollBy(0, scrollY);
        }
    }
}