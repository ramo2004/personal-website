import {
    Mesh,
    SphereGeometry,
    ShaderMaterial,
    Group,
    Color,
    Vector3
} from 'three';
import { CONFIG } from '../../config.js';

function createAmbientOrbs(mouseTracker) {
    const group = new Group();

    // Create orbs from CONFIG
    const orbConfigs = CONFIG.ORB_POSITIONS.map((pos, i) => ({
        position: new Vector3(pos.x, pos.y, pos.z),
        color: new Color(CONFIG.ORB_COLORS[i].r, CONFIG.ORB_COLORS[i].g, CONFIG.ORB_COLORS[i].b),
        scale: CONFIG.ORB_SCALES[i],
        speed: CONFIG.ORB_SPEEDS[i]
    }));

    const orbs = [];

    orbConfigs.forEach((config, index) => {
        const geometry = new SphereGeometry(1, CONFIG.SPHERE_SEGMENTS, CONFIG.SPHERE_SEGMENTS);

        // Simpler shader for better performance and visibility
        const material = new ShaderMaterial({
            uniforms: {
                color: { value: config.color },
                time: { value: 0 }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;

                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float time;
                varying vec3 vNormal;
                varying vec3 vPosition;

                void main() {
                    // Soft gradient from center to edge
                    float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);

                    // Very gentle pulsing
                    float pulse = 0.9 + sin(time * 0.4) * 0.1;

                    vec3 finalColor = color * intensity * pulse * 1.2;

                    // Higher alpha for better visibility
                    float alpha = intensity * 0.5;

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false
        });

        const orb = new Mesh(geometry, material);
        orb.position.copy(config.position);
        orb.scale.setScalar(config.scale);

        // Store original position and config for animation
        orb.userData = {
            originalPosition: config.position.clone(),
            speed: config.speed,
            offset: index * 2.0, // Phase offset for variation
            baseScale: config.scale
        };

        orbs.push(orb);
        group.add(orb);
    });

    let time = 0;

    group.tick = (delta) => {
        time += delta * CONFIG.TIME_SCALE;

        const mousePos = mouseTracker ? mouseTracker.get3DPosition() : new Vector3(9999, 9999, 9999);

        orbs.forEach((orb) => {
            const userData = orb.userData;

            // Organic floating motion using CONFIG
            const floatX = Math.sin(time * userData.speed + userData.offset) * CONFIG.FLOAT_RANGE_X;
            const floatY = Math.cos(time * userData.speed * 0.7 + userData.offset) * CONFIG.FLOAT_RANGE_Y;
            const floatZ = Math.sin(time * userData.speed * 0.5 + userData.offset * 1.5) * CONFIG.FLOAT_RANGE_Z;

            // Gentle mouse interaction
            const dx = orb.position.x - mousePos.x;
            const dy = orb.position.y - mousePos.y;
            const dz = orb.position.z - mousePos.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            let pushX = 0, pushY = 0, pushZ = 0;

            if (dist < CONFIG.MOUSE_INTERACT_RADIUS && dist > 0.1) {
                const force = (CONFIG.MOUSE_INTERACT_RADIUS - dist) / CONFIG.MOUSE_INTERACT_RADIUS;
                const pushStrength = force * CONFIG.MOUSE_PUSH_STRENGTH;
                pushX = (dx / dist) * pushStrength;
                pushY = (dy / dist) * pushStrength;
                pushZ = (dz / dist) * pushStrength;
            }

            // Smooth interpolation to target position
            const targetX = userData.originalPosition.x + floatX + pushX;
            const targetY = userData.originalPosition.y + floatY + pushY;
            const targetZ = userData.originalPosition.z + floatZ + pushZ;

            orb.position.x += (targetX - orb.position.x) * CONFIG.LERP_SPEED;
            orb.position.y += (targetY - orb.position.y) * CONFIG.LERP_SPEED;
            orb.position.z += (targetZ - orb.position.z) * CONFIG.LERP_SPEED;

            // Gentle breathing scale animation
            const breathe = 1.0 + Math.sin(time * 0.5 + userData.offset) * 0.06;
            const targetScale = userData.baseScale * breathe;
            orb.scale.setScalar(orb.scale.x + (targetScale - orb.scale.x) * CONFIG.SCALE_LERP_SPEED);

            // Update shader time uniform for pulsing
            orb.material.uniforms.time.value = time;
        });
    };

    // Cleanup method
    group.dispose = () => {
        orbs.forEach(orb => {
            orb.geometry.dispose();
            orb.material.dispose();
        });
    };

    return group;
}

export { createAmbientOrbs };
