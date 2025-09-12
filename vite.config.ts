import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// troque 'tcl-promocao' se o nome do repo mudar
export default defineConfig({
  plugins: [react()],
  base: '/tcl-promocao/',
})
