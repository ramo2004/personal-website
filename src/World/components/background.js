import { TextureLoader } from 'three';
import bgImg from '../../assets/space_background.png';

function loadBackground(scene) {
    const loader = new TextureLoader();
    loader.load('/space_background.png', (texture) => {
        scene.background = texture;
    });
}

export { loadBackground };
