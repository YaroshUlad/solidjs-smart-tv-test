import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  base: './',
  publicDir: 'static',
  build: {
    minify: true,
    sourcemap: true,
  },
  plugins: [
    solid(),
    legacy({
      targets: ['chrome >= 47'],
      modernPolyfills: ['es/global-this'],
    })
  ]
})
