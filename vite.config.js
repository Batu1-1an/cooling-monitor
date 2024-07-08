/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Use Vitest global APIs
    environment: 'jsdom', // Simulate DOM environment
    setupFiles: './src/setupTests.js', // Setup file for tests
    // Optional: You might want to add CSS handling if needed for tests
    // css: true,
  },
})
