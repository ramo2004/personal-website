import { Raycaster, Vector2, Vector3, Plane } from 'three';

class MouseTracker {
    constructor(camera, container) {
        this.camera = camera;
        this.container = container;

        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
        this.worldPos = new Vector3();

        // Dynamic plane that moves with camera Z to always be at camera's focal point
        this.intersectPlane = new Plane(new Vector3(0, 0, 1), 0);

        this.hasInteraction = false;

        this.init();
    }

    init() {
        this.mouseMoveHandler = (e) => {
            this.hasInteraction = true;
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        this.touchMoveHandler = (e) => {
            this.hasInteraction = true;
            const touch = e.touches[0];
            this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        };

        this.touchStartHandler = () => {
            this.hasInteraction = true;
        };

        window.addEventListener('mousemove', this.mouseMoveHandler);
        window.addEventListener('touchmove', this.touchMoveHandler);
        window.addEventListener('touchstart', this.touchStartHandler);
    }

    destroy() {
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        window.removeEventListener('touchmove', this.touchMoveHandler);
        window.removeEventListener('touchstart', this.touchStartHandler);
    }

    get3DPosition() {
        if (!this.hasInteraction) return new Vector3(9999, 9999, 9999); // Off-screen default

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Update plane to be slightly in front of camera for better interaction
        // This ensures the interaction point is always at a reasonable depth
        const planeZ = this.camera.position.z - 30;
        this.intersectPlane.constant = -planeZ;

        const target = new Vector3();
        this.raycaster.ray.intersectPlane(this.intersectPlane, target);

        // If no intersection (looking away), return far away
        if (!target) return new Vector3(9999, 9999, 9999);

        return target;
    }
}

export { MouseTracker };
