import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: false,
    watch: {},
  },
  plugins: [react()],
  base: '',
});
