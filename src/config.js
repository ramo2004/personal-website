// Central configuration for all magic numbers and settings
export const CONFIG = {
    // Performance
    SPHERE_SEGMENTS: 32,
    MAX_PIXEL_RATIO: 2,
    ENABLE_ANTIALIASING: true,

    // Orbs
    ORB_COUNT: 3,
    ORB_POSITIONS: [
        { x: -20, y: 8, z: 35 },
        { x: 18, y: -10, z: 38 },
        { x: 0, y: 15, z: 32 }
    ],
    ORB_SCALES: [18, 22, 16],
    ORB_COLORS: [
        { r: 0.5, g: 0.52, b: 0.6 },
        { r: 0.65, g: 0.58, b: 0.48 },
        { r: 0.48, g: 0.48, b: 0.52 }
    ],
    ORB_SPEEDS: [0.15, 0.12, 0.18],

    // Interaction
    MOUSE_INTERACT_RADIUS: 35,
    MOUSE_PUSH_STRENGTH: 10,

    // Animation
    FLOAT_RANGE_X: 4,
    FLOAT_RANGE_Y: 3,
    FLOAT_RANGE_Z: 2,
    TIME_SCALE: 0.5,
    LERP_SPEED: 0.03,
    SCALE_LERP_SPEED: 0.08,

    // Camera
    CAMERA_FOV: 75,
    CAMERA_NEAR: 0.1,
    CAMERA_FAR: 1000,
    CAMERA_START_Z: 40,

    // Scroll
    SCROLL_SPEED: 0.025,
    SCROLL_LERP: 5.0,

    // Debug
    DEBUG_KEY: 'd',
    DEBUG_ENABLED: false,

    // Colors
    SCENE_BG_COLOR: 0x0a0a0a,

    // Contact
    EMAIL: 'omarimian@gmail.com',
    LINKEDIN: 'https://www.linkedin.com/in/omarimian/',
    GITHUB: 'https://github.com/ramo2004',

    // Projects
    QUEST_KEEPER_URL: 'https://questkeeper-v1.netlify.app/',
    PDF_TO_AUDIO_URL: 'https://pdftoaudioconverter.netlify.app/',

    // Resume
    RESUME_PDF: '/Omar_Mian_Resume.pdf'
};
