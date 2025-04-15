import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

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
    tailwind(), // Use the official Tailwind Vite plugin
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
