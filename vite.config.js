import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      manifest: {
        name: 'Leeto — Your 4+1 Taxi',
        short_name: 'Leeto',
        description: 'Leeto — Your 4+1 taxi, on demand. Book a ride in seconds across Lesotho.',
        theme_color: '#0A0A0A',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/?standalone=true',
        scope: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      // Proxy /api requests to the Azure Functions backend
      // (avoids CORS issues when developing on localhost)
      '/api': {
        target: 'https://lesothouberapi-a7fmgdfsfjbwbqgu.northeurope-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
        ws: true,  // support WebSocket upgrade for SignalR
      },
    },
  },
})
