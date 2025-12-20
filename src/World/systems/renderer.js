import { WebGLRenderer } from 'three';
import { CONFIG } from '../../config.js';

function createRenderer() {
    // WebGL support detection
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        const fallback = document.createElement('div');
        fallback.style.cssText = 'color:#c4b5a0;text-align:center;padding:4rem;font-family:var(--heading-font)';
        fallback.innerHTML = '<h2 style="margin-bottom:1rem;font-weight:300">3D Graphics Not Supported</h2><p style="color:#999;font-size:0.9rem">Please use a modern browser to view this site with full features.</p>';
        document.querySelector('#bg-container')?.appendChild(fallback);
        throw new Error('WebGL not supported');
    }

    try {
        const renderer = new WebGLRenderer({
            antialias: CONFIG.ENABLE_ANTIALIASING,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
        });

        // Performance optimizations
        renderer.shadowMap.enabled = false;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.MAX_PIXEL_RATIO));

        return renderer;
    } catch (error) {
        console.error('Renderer initialization failed:', error);
        throw new Error(`Failed to initialize 3D graphics: ${error.message}`);
    }
}

export { createRenderer };
