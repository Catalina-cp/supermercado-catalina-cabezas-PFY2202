import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' permite publicar el sitio en GitHub Pages sin que quede en blanco
export default defineConfig({
  plugins: [react()],
  base: './',
})
