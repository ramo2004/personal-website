import { Scene, Color } from 'three';
import { CONFIG } from '../../config.js';

function createScene() {
    const scene = new Scene();

    // Set background to prevent transparency issues
    scene.background = new Color(CONFIG.SCENE_BG_COLOR);

    return scene;
}

export { createScene };
