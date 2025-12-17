import {
    PlaneGeometry,
    MeshStandardMaterial,
    Mesh,
    BufferAttribute,
    Color,
    DoubleSide,
    MathUtils
} from 'three';

function createDigitalTerrain() {
    // Large plane with many segments for smooth waves
    const geometry = new PlaneGeometry(100, 100, 64, 64);

    // Store original positions for calculating waves
    const count = geometry.attributes.position.count;
    const positionAttribute = geometry.attributes.position;
    const originalZ = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        originalZ[i] = positionAttribute.getZ(i);
    }

    // High-tech wireframe look
    const material = new MeshStandardMaterial({
        color: 0x00ffff, // Cyan/Teal
        wireframe: true,
        side: DoubleSide,
        emissive: 0x0044aa,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8
    });

    const plane = new Mesh(geometry, material);

    // Rotate to be a floor
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10; // Start below camera
    plane.position.z = -20; // Stretch into distance

    let time = 0;

    plane.tick = (delta) => {
        time += delta * 0.5; // Speed of wave

        for (let i = 0; i < count; i++) {
            // Get X and Y (which corresponds to world X and Z because of rotation)
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);

            // Create complex wave pattern
            // wave 1: moving diagonal
            const wave1 = 2 * Math.sin(x * 0.2 + time);
            // wave 2: moving other diagonal
            const wave2 = 1.5 * Math.sin(y * 0.15 + time * 1.2);
            // wave 3: subtle noise
            const wave3 = 0.5 * Math.sin((x + y) * 0.5 + time * 0.5);

            // Apply new height (Z in local space)
            /* 
               Note: We are modifying Z of the PlaneGeometry. 
               Since the mesh is rotated -90deg on X, 
               Local Z -> World Y (Height)
            */
            const height = wave1 + wave2 + wave3;

            positionAttribute.setZ(i, originalZ[i] + height);
        }

        // Mark as needing update for GPU
        positionAttribute.needsUpdate = true;

        // Slowly move the grid towards camera to simulate infinite forward motion
        // plane.position.z += delta * 2;
        // if(plane.position.z > 0) plane.position.z = -20; 
        // ^ Simple implementation might jump, let's stick to stationary waving for now
    };

    return plane;
}

export { createDigitalTerrain };
