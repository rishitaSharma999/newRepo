import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        bufferSize: 100 * 1024,
      },
    },
  },
})
