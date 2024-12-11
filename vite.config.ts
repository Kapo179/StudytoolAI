import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      global: 'global',
      buffer: 'buffer',
      process: 'process/browser', // Ensure process is aliased to process/browser
    },
  },
  optimizeDeps: {
    exclude: [
      'chunk-BWFG447A.js',
      'chunk-MJNXEZOV.js',
    ],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});