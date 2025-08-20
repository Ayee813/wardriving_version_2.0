import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// allow bcf1d4b5d210.ngrok-free.app
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },

  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "d03378e5c7a9.ngrok-free.app"
    ]
  }
})