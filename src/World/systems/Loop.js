import { Clock } from 'three';

class Loop {
  constructor(camera, scene, renderer, composer = null) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.composer = composer; // Post-processing composer (optional)
    this.updatables = [];
    this.clock = new Clock();
    this.animationId = null;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();

      // Use composer if available (for post-processing), otherwise regular render
      if (this.composer) {
        this.composer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = this.clock.getDelta();
    // Clamp huge deltas (e.g. if tab was inactive) to avoid physics explosions
    const safeDelta = Math.min(delta, 0.1); 

    for (const object of this.updatables) {
      if (object.tick) {
        object.tick(safeDelta);
      }
    }
  }
}

export { Loop };
