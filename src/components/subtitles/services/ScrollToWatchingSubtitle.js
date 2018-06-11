export default class ScrollToWatchingSubtitle {
    constructor(parentElement, watchingBlockClass) {
        if (!(parentElement instanceof HTMLElement)) {
            throw new TypeError('parentElement should be a HTMLElement');
        }

        if (typeof watchingBlockClass !== 'string' || watchingBlockClass.length === 0) {
            throw new TypeError('watchingBlockClass should be a not empty string');
        }

        this._parentEl           = parentElement;
        this._watchingBlockClass = watchingBlockClass;

        this._pxToMiddleParentEl       = undefined;
        this._tryScrollInterval        = undefined;
        this._tryScrollIntervalTimeout = 300;
    }

    start() {
        this._tryScrollInterval = setInterval(() => this._tryScroll(), this._tryScrollIntervalTimeout);

        this._pxToMiddleParentEl = this._parentEl.clientHeight / 2;
    }

    stop() {
        clearInterval(this._tryScrollInterval);
    }

    _tryScroll() {
        const watchingEl      = this._parentEl.querySelector(`.${this._watchingBlockClass}`);
        const parentScrollTop = this._parentEl.scrollTop;

        if (!watchingEl) {
            return;
        }

        const watchingElAboveParentElement = watchingEl.offsetTop - this._pxToMiddleParentEl > parentScrollTop;
        const watchingElBelowParentElement = parentScrollTop > watchingEl.offsetTop + this._pxToMiddleParentEl;

        if (watchingElAboveParentElement || watchingElBelowParentElement) {
            const scrollY = watchingEl.offsetTop - this._pxToMiddleParentEl;

            this._parentEl.scrollTo(0, scrollY);
        }
    }
}
