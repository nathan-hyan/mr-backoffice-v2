import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '~components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
            {
                find: '~screens',
                replacement: path.resolve(__dirname, 'src/screens'),
            },
            {
                find: '~config',
                replacement: path.resolve(__dirname, 'src/config'),
            },
            {
                find: '~utils',
                replacement: path.resolve(__dirname, 'src/utils'),
            },
            {
                find: '~assets',
                replacement: path.resolve(__dirname, 'src/assets'),
            },
            {
                find: '~hooks',
                replacement: path.resolve(__dirname, 'src/hooks'),
            },
        ],
    },
});
