import { defineConfig } from 'vite';

// Relative base so the site works from any sub-path (GitHub Pages project site, embedded, etc.)
export default defineConfig({
  base: './',
  build: { target: 'es2022' },
});
