import { Scene, Color } from 'three';

function createScene() {
    const scene = new Scene();

    // Background can be set here or later with a texture
    // scene.background = new Color('black'); 

    return scene;
}

export { createScene };
