import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base allows the build to work at any sub-path
// (GitHub Pages /Version1/, Vercel /, Netlify /, custom domain /, etc.)
export default defineConfig({
  plugins: [react()],
  base: './',
})
