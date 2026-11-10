import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If the browser blocks requests to the API (CORS), set
// VITE_API_BASE_URL=/api in .env and restart `npm run dev`.
// The dev server will then forward /api/* to the hosted API.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://taskflowapi-v2-0-0-1.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
