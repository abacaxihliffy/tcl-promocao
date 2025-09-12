import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// use exatamente o nome do repo
export default defineConfig({
  plugins: [react()],
  base: '/tcl-promocao/',
})
