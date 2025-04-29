import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
    // Reduce CSS size in production
    devSourcemap: false,
  },
  // Performance optimizations
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        // Remove debugger statements
        drop_debugger: true
      }
    },
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'gsap', 'lenis', '@studio-freight/react-lenis']
        }
      }
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
    },
  },
  // Optimize server performance
  server: {
    hmr: {
      // Optimize HMR for better development experience
      overlay: true
    },
  },
  // Optimize asset handling
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'framer-motion'],
    exclude: []
  },
  // Disable source maps in production for better performance
  sourcemap: false
})
