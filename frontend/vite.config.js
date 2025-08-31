import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 7070,
    allowedHosts: ['dev.local', 'localhost', '127.0.0.1'],
    proxy: {
      '/api': {
        target: process.env.VITE_API_TARGET || 'http://dev.local',
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
