import { PerspectiveCamera } from 'three';
import { CONFIG } from '../../config.js';

function createCamera() {
    const camera = new PerspectiveCamera(
        CONFIG.CAMERA_FOV,
        window.innerWidth / window.innerHeight,
        CONFIG.CAMERA_NEAR,
        CONFIG.CAMERA_FAR
    );

    camera.position.set(0, 0, CONFIG.CAMERA_START_Z);

    return camera;
}

export { createCamera };
