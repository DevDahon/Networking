import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    chunkSizeWarningLimit: 650,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-icons', test: /node_modules[\\/]lucide/ },
            { name: 'simulations', test: /src[\\/]simulations/ }
          ]
        }
      }
    }
  },
  test: { environment: 'jsdom' }
});
