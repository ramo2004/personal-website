class DebugOverlay {
    constructor(renderer) {
        this.renderer = renderer;
        this.domElement = document.createElement('div');
        this.initStyles();

        this.visible = false;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fps = 0;

        document.body.appendChild(this.domElement);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'd') {
                this.toggle();
            }
        });
    }

    initStyles() {
        this.domElement.style.position = 'fixed';
        this.domElement.style.top = '10px';
        this.domElement.style.left = '10px';
        this.domElement.style.background = 'rgba(0, 0, 0, 0.8)';
        this.domElement.style.color = '#0f0';
        this.domElement.style.padding = '8px';
        this.domElement.style.fontFamily = 'monospace';
        this.domElement.style.fontSize = '12px';
        this.domElement.style.zIndex = '9999';
        this.domElement.style.display = 'none';
        this.domElement.style.pointerEvents = 'none';
    }

    toggle() {
        this.visible = !this.visible;
        this.domElement.style.display = this.visible ? 'block' : 'none';
    }

    tick() {
        if (!this.visible) return;

        this.frameCount++;
        const now = performance.now();

        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const info = this.renderer.info;
        this.domElement.innerHTML = `
      FPS: ${this.fps}<br>
      Draw Calls: ${info.render.calls}<br>
      Triangles: ${info.render.triangles}<br>
      Geometries: ${info.memory.geometries}<br>
      Textures: ${info.memory.textures}
    `;
    }
}

export { DebugOverlay };
