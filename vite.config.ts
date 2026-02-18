import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      '195.35.40.60', // Example: '192.168.1.101'
      'gatestoargentina.com',
      //     '.example.com', // Allows example.com and all subdomains (e.g., foo.example.com)
    ]
  }
});
