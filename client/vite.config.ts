import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Express API runs on 5050 (see server/.env); the dev server proxies /api to it.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
});
