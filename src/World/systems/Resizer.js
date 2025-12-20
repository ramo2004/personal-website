import { CONFIG } from '../../config.js';

const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.MAX_PIXEL_RATIO));
};

class Resizer {
    constructor(container, camera, renderer) {
        this.container = container;
        this.camera = camera;
        this.renderer = renderer;

        this.resizeHandler = () => {
            setSize(this.container, this.camera, this.renderer);
            this.onResize();
        };

        // Set initial size
        setSize(container, camera, renderer);

        window.addEventListener('resize', this.resizeHandler);
    }

    onResize() { }

    destroy() {
        window.removeEventListener('resize', this.resizeHandler);
    }
}

export { Resizer };
