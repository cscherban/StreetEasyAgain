// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

const src = resolve(__dirname, 'src')

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                background: resolve(src, 'background.ts'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
})
