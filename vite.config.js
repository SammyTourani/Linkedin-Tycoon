import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  publicDir: 'public',
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
