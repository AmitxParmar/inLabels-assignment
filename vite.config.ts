import path from 'path'

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'https://mockapi.io/clone/684ed48bf0c9c9848d293c42/api/v1',
    },
  },
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      '@': path.resolve('./*'),
    },
  },
})
