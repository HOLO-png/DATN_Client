import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: { plugins: ['decorators-legacy', 'classProperties'] }
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          '@mui': ['@mui/icons-material', '@mui/lab', '@mui/material', '@mui/utils']
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: '*', replacement: path.resolve(__dirname, 'src') },
      { find: 'sdk', replacement: path.resolve(__dirname, 'src/sdk') },
      { find: 'constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'hook', replacement: path.resolve(__dirname, 'src/hook') }
    ]
  }
})
