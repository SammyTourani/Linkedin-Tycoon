import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Linkedin-Tycoon/' : '/',
  server: {
    host: true,
    port: 3003,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  publicDir: 'public',
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
