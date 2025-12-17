import { Clock } from 'three';

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.clock = new Clock();
    this.animationId = null;
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
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
