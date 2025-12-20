import { MathUtils } from 'three';
import { CONFIG } from '../config.js';

class ScrollObserver {
    constructor() {
        this.targetScroll = 0;
        this.currentScroll = 0;
        this.scrollRatio = 0;

        this.bindEvents();
    }

    bindEvents() {
        this.scrollHandler = () => {
            this.targetScroll = window.scrollY;
            this.updateScrollRatio();
        };

        window.addEventListener('scroll', this.scrollHandler);

        // Initial call
        this.targetScroll = window.scrollY;
        this.updateScrollRatio();
    }

    updateScrollRatio() {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            this.scrollRatio = this.targetScroll / docHeight;
        } else {
            this.scrollRatio = 0;
        }
    }

    tick(delta) {
        this.currentScroll = MathUtils.lerp(this.currentScroll, this.targetScroll, CONFIG.SCROLL_LERP * delta);
    }

    getScroll() {
        return this.currentScroll;
    }

    destroy() {
        window.removeEventListener('scroll', this.scrollHandler);
    }
}

export { ScrollObserver };
