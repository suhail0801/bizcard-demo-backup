import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enable network access
    proxy: {
      '/api': {
        // target: 'http://167.172.76.160:5001', // Use HTTP if your backend is not using HTTPS
        target: 'http://localhost:5001', // Changed for local development
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
