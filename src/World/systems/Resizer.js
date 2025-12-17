const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Clamp DPR for performance
};

class Resizer {
    constructor(container, camera, renderer) {
        // Set initial size
        setSize(container, camera, renderer);

        window.addEventListener('resize', () => {
            // Set the resize again on event
            setSize(container, camera, renderer);
            // Perform any custom onResize logic
            this.onResize();
        });
    }

    onResize() { }
}

export { Resizer };
