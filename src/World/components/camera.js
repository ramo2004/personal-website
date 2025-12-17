import { PerspectiveCamera } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(
        75, // fov
        window.innerWidth / window.innerHeight, // aspect
        0.1, // near
        1000 // far
    );

    camera.position.set(0, 0, 30);

    return camera;
}

export { createCamera };
