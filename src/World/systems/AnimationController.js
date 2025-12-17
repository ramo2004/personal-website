import { MathUtils } from 'three';

class AnimationController {
    constructor(camera, sceneObjects) {
        this.camera = camera;
        this.objects = sceneObjects; // { terrain, particles }

        // Initial camera position adjustment for the landscape
        this.camera.position.set(0, 5, 20);
        this.camera.lookAt(0, 0, 0);
    }

    tick(delta, scrollCurrent) {
        // scrollCurrent is roughly 0 to 1 (normalized by doc height in ScrollObserver? No, it was scrollY lerped)
        // Actually ScrollObserver.getScroll() returns the raw lerped Y value (pixels).

        const t = scrollCurrent;

        // Camera movement: Fly "forward" over the terrain as we scroll down
        // We move -Z (into the screen).

        // Base position + scroll offset
        // As we scroll (t increases), Z decreases (moves forward)
        this.camera.position.z = 20 - (t * 0.02);

        // Also slight lift/tilt
        // this.camera.position.y = 5 + (t * 0.005);

        // Don't modify lookAt every frame unless necessary or using a target object.
        // Simple linear movement is often cleanest.

        // Optional: Particles could rise or fall?
        if (this.objects.particles) {
            // Reverse direction of particles to enhance speed feeling
            this.objects.particles.rotation.z = t * 0.0002;
        }
    }
}

export { AnimationController };
