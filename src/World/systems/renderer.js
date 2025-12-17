import { WebGLRenderer } from 'three';

function createRenderer() {
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true, // Allow CSS background to show through if needed
        powerPreference: 'high-performance'
    });

    // Physically correct lighting settings (optional but good for realism)
    // renderer.physicallyCorrectLights = true; // Deprecated in r150+, use useLegacyLights = false
    // renderer.useLegacyLights = false; 

    return renderer;
}

export { createRenderer };
