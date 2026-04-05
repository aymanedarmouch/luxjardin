import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blogLandscaping: resolve(__dirname, 'blog-landscaping.html'),
        blogMediterranean: resolve(__dirname, 'blog-mediterranean.html'),
        blogCacti: resolve(__dirname, 'blog-cacti.html'),
      }
    }
  }
});
