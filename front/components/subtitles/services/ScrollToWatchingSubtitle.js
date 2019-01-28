// TODO need refactoring, we should have a method, that will be scroll to top of parent element
// handling when we should scroll - should be happened in user code
// firstly, current code broken principe of Single Responsibility
// secondary, that help avoid redundant scrolling when video is stopped
export default class ScrollToWatchingSubtitle {
    constructor(parentElement, watchingBlockClass) {
        if (!(parentElement instanceof HTMLElement)) {
            throw new TypeError('parentElement should be a HTMLElement');
        }

        if (typeof watchingBlockClass !== 'string' || watchingBlockClass.length === 0) {
            throw new TypeError('watchingBlockClass should be a not empty string');
        }

        this._parentEl                 = parentElement;
        this._watchingBlockClass       = watchingBlockClass;
        this._tryScrollInterval        = undefined;
        this._tryScrollIntervalTimeout = 1000;
    }

    start() {
        this._pxToMiddleParentEl       = this._parentEl.clientHeight / 2;
        this._tryScrollInterval = setInterval(() => this._tryScroll(), this._tryScrollIntervalTimeout);
    }

    stop() {
        clearInterval(this._tryScrollInterval);
    }

    _tryScroll() {
        const watchingEl      = this._parentEl.querySelector(`.${this._watchingBlockClass}`);
        const parentScrollTop = this._parentEl.scrollTop;

        if (watchingEl && (watchingEl.offsetTop - this._pxToMiddleParentEl > parentScrollTop)) {
            const scrollY = watchingEl.offsetTop - this._pxToMiddleParentEl;

            this._parentEl.scrollTo(0, scrollY);
        }
    }
}
