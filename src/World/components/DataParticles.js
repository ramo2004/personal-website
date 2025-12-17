import {
    BufferGeometry,
    Float32BufferAttribute,
    PointsMaterial,
    Points,
    MathUtils
} from 'three';

function createDataParticles(count = 2000) {
    const geometry = new BufferGeometry();
    const positions = [];

    for (let i = 0; i < count; i++) {
        const x = MathUtils.randFloatSpread(150);
        const y = MathUtils.randFloatSpread(100);
        const z = MathUtils.randFloatSpread(100);
        positions.push(x, y, z);
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

    const material = new PointsMaterial({
        color: 0x88ccff, // Light blue
        size: 0.15,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const particles = new Points(geometry, material);

    particles.tick = (delta) => {
        // Subtle drift
        particles.rotation.y += delta * 0.02;
    };

    return particles;
}

export { createDataParticles };
