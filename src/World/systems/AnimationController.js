import { CONFIG } from '../../config.js';

class AnimationController {
    constructor(camera, sceneObjects, scrollObserver) {
        this.camera = camera;
        this.objects = sceneObjects;
        this.scrollObserver = scrollObserver;

        // Position camera for a good view
        this.camera.position.set(0, 0, CONFIG.CAMERA_START_Z);
        this.camera.lookAt(0, 0, 0);
    }

    tick(delta) {
        const t = this.scrollObserver ? this.scrollObserver.getScroll() : 0;

        // Camera movement using CONFIG
        this.camera.position.z = CONFIG.CAMERA_START_Z - (t * CONFIG.SCROLL_SPEED);

        // Gentle rotation based on scroll
        this.camera.rotation.z = t * 0.0001;
    }

    destroy() {
        // No cleanup needed for this system
    }
}

export { AnimationController };
