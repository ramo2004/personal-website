import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createDigitalTerrain } from './components/DigitalTerrain.js';
import { createDataParticles } from './components/DataParticles.js';
// import { loadBackground } from './components/background.js'; // Disabled for wireframe look

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { ScrollObserver } from '../Utils/ScrollObserver.js';
import { AnimationController } from './systems/AnimationController.js';
import { DebugOverlay } from '../Utils/Debug.js';

class World {
    constructor(container) {
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        this.loop = new Loop(this.camera, this.scene, this.renderer);

        container.append(this.renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        // Create Objects
        const terrain = createDigitalTerrain();
        const particles = createDataParticles();

        // Add to Scene
        this.scene.add(ambientLight, mainLight, terrain, particles);

        // Scroll handling
        this.scrollObserver = new ScrollObserver();
        this.animationController = new AnimationController(this.camera, { terrain, particles });

        // Custom tick for the loop to update scroll-dependent systems
        this.loop.updatables.push(this.scrollObserver);

        // We create a wrapper object to satisfy the tick interface for the controller
        const controllerWrapper = {
            tick: (delta) => {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!reducedMotion) {
                    this.animationController.tick(delta, this.scrollObserver.getScroll());
                }
            }
        };
        this.loop.updatables.push(controllerWrapper);

        // Debug Overlay
        const debug = new DebugOverlay(this.renderer);
        this.loop.updatables.push(debug);

        // Add component animations
        const objectAnimator = {
            tick: (delta) => {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!reducedMotion) {
                    terrain.tick(delta);
                    particles.tick(delta);
                }
            }
        };
        this.loop.updatables.push(objectAnimator);

        const resizer = new Resizer(container, this.camera, this.renderer);
        this.resizer = resizer;
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }
}

export { World };
