import { World } from './World/World.js';

async function main() {
    const container = document.querySelector('#bg-container');
    // If we can't find the container, we might need to create it or wait for DOM, 
    // but for now we expect it in index.html

    if (!container) {
        console.error("Couldn't find #bg-container");
        return;
    }

    const world = new World(container);

    // await world.init(); // Wait for assets

    world.start();
}

main().catch((err) => {
    console.error(err);
});
