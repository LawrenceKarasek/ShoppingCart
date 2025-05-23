import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/frontend',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react(),
  ],

  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html', // Specify the entry point for Vite
    },
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
