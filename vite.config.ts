import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Vite Configuration
 * 
 * ⚠️ IMPORTANT: This is a global configuration file.
 * Changes to this file affect the entire build process and should be reviewed.
 * 
 * Key configurations:
 * - Path aliases (@/ for src/)
 * - Build optimizations (code splitting, chunking)
 * - Dev server settings
 * - Production build settings
 * - Performance optimizations
 */
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Include .tsx files
      include: '**/*.{jsx,tsx}',
      // Babel optimization for production
      babel: {
        plugins: [
          // Remove console.log in production (optional)
          ...(process.env.NODE_ENV === 'production'
            ? []
            : []),
        ],
      },
    }),
  ],

  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true, // Listen on all addresses
    cors: true,
    // Proxy configuration for API (uncomment if needed)
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },

  // Preview server configuration (for production preview)
  preview: {
    port: 4173,
    host: true,
    cors: true,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true, // Generate source maps for debugging
    minify: 'esbuild', // Fast minification
    target: 'esnext', // Modern browsers
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Performance optimizations
    cssCodeSplit: true, // Split CSS into separate files
    reportCompressedSize: true, // Report compressed sizes
    
    // Rollup options for advanced build configuration
    rollupOptions: {
      output: {
        // Manual code splitting for better caching
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor'
            }
            if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'ui-vendor'
            }
            if (id.includes('axios')) {
              return 'utils-vendor'
            }
            // Other node_modules
            return 'vendor'
          }
          
          // Feature-based code splitting
          if (id.includes('/features/')) {
            const featureMatch = id.match(/\/features\/([^/]+)/)
            if (featureMatch) {
              return `feature-${featureMatch[1]}`
            }
          }
        },
        // Chunk file naming with content hash for cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  // Environment variables
  envPrefix: 'VITE_', // Only expose env vars prefixed with VITE_
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
    ],
    // Exclude large dependencies that should be loaded on demand
    exclude: [],
  },
})
