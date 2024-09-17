import { defineConfig } from 'vite'

export default defineConfig({
    base: '/personal-website/', // Replace with your repository name
    resolve: {
        alias: {
            'three': 'three'
        }
    },
    optimizeDeps: {
        include: ['three']
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three']
                }
            }
        }
    }
})