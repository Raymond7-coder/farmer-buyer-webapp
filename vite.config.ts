import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',                          // ensures relative asset paths in production
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // the long list of alias-with-versions isn't needed; imports already use package names
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist'                     // <— Vercel expects this
  }
  // server settings are only for local dev; safe to omit on Vercel
})
