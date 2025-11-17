import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base:"/",
  server:{
    proxy:{
      "/api":{
        target:import.meta.env.VITE_BASE_URL,
        changeOrigin:true,
        secure:true
      }
    },
  },
})
