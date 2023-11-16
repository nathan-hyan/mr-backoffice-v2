/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/setupTest.ts'],
    css: true,
    coverage: {
      enabled: true,
      skipFull: true,
      provider: 'v8',
      functions: 100,
      lines: 100,
      branches: 100,
      statements: 100,
      thresholdAutoUpdate: true, // Makes coverage thresholds go brrrrr
    },
  },
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
      {
        find: '~contexts',
        replacement: path.resolve(__dirname, 'src/contexts'),
      },
      {
        find: '~constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
    ],
  },
});
