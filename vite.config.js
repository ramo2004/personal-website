import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/personal-website/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        }
    },
    publicDir: 'public', // This ensures files in the public directory are copied to build output
})