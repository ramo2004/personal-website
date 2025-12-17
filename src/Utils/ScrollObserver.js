import { MathUtils } from 'three';

class ScrollObserver {
    constructor() {
        this.targetScroll = 0;
        this.currentScroll = 0;
        this.scrollRatio = 0; // 0 to 1 based on page height

        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.targetScroll = window.scrollY;
            this.updateScrollRatio();
        });

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
        // Lerp current scroll towards target (damping)
        // Adjust 5.0 to change smoothing amount (higher = faster snap)
        this.currentScroll = MathUtils.lerp(this.currentScroll, this.targetScroll, 5.0 * delta);
    }

    getScroll() {
        return this.currentScroll;
    }
}

export { ScrollObserver };
