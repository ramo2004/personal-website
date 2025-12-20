import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
// import { loadBackground } from './components/background.js';

import { createRenderer } from './systems/renderer.js';
import { CONFIG } from '../config.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { ScrollObserver } from '../Utils/ScrollObserver.js';
import { MouseTracker } from '../Utils/MouseTracker.js';
import { createAmbientOrbs } from './components/AmbientOrbs.js';
import { AnimationController } from './systems/AnimationController.js';
import { DebugOverlay } from '../Utils/Debug.js';

class World {
    constructor(container) {
        this.container = container;
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        this.loop = new Loop(this.camera, this.scene, this.renderer);

        container.append(this.renderer.domElement);

        const { ambientLight, mainLight } = createLights();

        // Create systems
        this.mouseTracker = new MouseTracker(this.camera, container);
        this.scrollObserver = new ScrollObserver();
        this.animationController = new AnimationController(this.camera, {}, this.scrollObserver);
        this.resizer = new Resizer(container, this.camera, this.renderer);

        // Create components
        this.ambientOrbs = createAmbientOrbs(this.mouseTracker);

        // Add to scene
        this.scene.add(ambientLight, mainLight, this.ambientOrbs);

        // Check for reduced motion preference
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Orb animator
        const objectAnimator = {
            tick: (delta) => {
                if (!reducedMotion) {
                    this.ambientOrbs.tick(delta);
                } else {
                    // Freeze shader time when reduced motion is on
                    this.ambientOrbs.traverse(obj => {
                        if (obj.material && obj.material.uniforms && obj.material.uniforms.time) {
                            obj.material.uniforms.time.value = 0;
                        }
                    });
                }
            }
        };

        // Add updatables based on reduced motion
        if (!reducedMotion) {
            this.loop.updatables.push(this.animationController, objectAnimator);
        } else {
            // Still add orb animator but it will freeze shaders
            this.loop.updatables.push(objectAnimator);
        }

        this.loop.updatables.push(this.scrollObserver);

        // Debug overlay (dev only)
        if (CONFIG.DEBUG_ENABLED) {
            this.debug = new DebugOverlay(this.renderer);
            this.loop.updatables.push(this.debug);
        }
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    destroy() {
        // Stop render loop
        this.loop.stop();

        // Destroy all systems
        this.resizer?.destroy();
        this.scrollObserver?.destroy();
        this.mouseTracker?.destroy();
        this.animationController?.destroy();
        this.debug?.destroy();

        // Dispose Three.js objects
        this.ambientOrbs?.dispose();

        this.scene.traverse((obj) => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });

        this.renderer.dispose();
        this.renderer.domElement.remove();

        console.log('World destroyed and cleaned up');
    }
}

export { World };
