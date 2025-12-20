import { World } from './World/World.js';

async function main() {
    const container = document.querySelector('#bg-container');
    const loading = document.getElementById('loading-screen');

    if (!container) {
        console.error("Couldn't find #bg-container");
        return;
    }

    try {
        // Clean up any existing canvas
        container.innerHTML = '';

        // Initialize world
        const world = new World(container);

        // Start rendering
        world.start();

        // Hide loading screen with fade
        if (loading) {
            loading.style.transition = 'opacity 0.5s ease';
            loading.style.opacity = '0';
            setTimeout(() => loading.remove(), 500);
        }

        // Set up scroll progress indicator
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            });
        }

        // Set up intersection observer for card reveals
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card').forEach(card => {
            observer.observe(card);
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            world.destroy();
        });

    } catch (err) {
        console.error('Initialization error:', err);

        // Show error UI
        if (loading) {
            loading.innerHTML = `
                <div style="color:#c4b5a0;text-align:center;max-width:500px;padding:2rem">
                    <h2 style="margin-bottom:1rem;font-weight:300;font-size:1.5rem">Unable to Load 3D Background</h2>
                    <p style="color:#999;font-size:0.9rem;line-height:1.6">${err.message || 'An unexpected error occurred'}</p>
                    <button onclick="location.reload()" style="margin-top:1.5rem;padding:0.75rem 1.5rem;background:#c4b5a0;color:#0a0a0a;border:none;border-radius:8px;cursor:pointer;font-size:0.95rem;font-weight:500">Retry</button>
                </div>
            `;
        }
    }
}

main().catch((err) => {
    console.error('Fatal error:', err);
});
