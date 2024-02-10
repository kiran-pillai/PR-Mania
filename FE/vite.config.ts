import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    https: {
      key: 'localhost.key',
      cert: 'localhost.crt',
    },
    host: true,
    strictPort: true,
    port: 3001,
  },
});
