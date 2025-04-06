// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(),react()],
//   server: {
//     historyApiFallback: true,
//   }
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    middlewareMode: false,
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0]; // Strip query params for matching
        console.log('Request URL:', req.url); // Debug log

        // Skip API and asset requests
        if (url.startsWith('/api') || url.startsWith('/src') || url.includes('.')) {
          return next();
        }

        // Serve index.html for all other routes
        const indexPath = resolve(__dirname, 'index.html');
        res.setHeader('Content-Type', 'text/html');
        res.end(readFileSync(indexPath));
      });
    },
  },
  preview: {
    port: 4173, // For npm run preview
  },
});