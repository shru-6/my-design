import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve shru-design-system to source files instead of dist
      // This allows hot reloading of library changes at runtime
      'shru-design-system': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    watch: {
      // Watch the parent src directory for changes
      ignored: ['!**/../src/**'],
    },
    fs: {
      // Allow serving files from parent directory
      allow: ['..'],
    },
  },
  optimizeDeps: {
    // Don't pre-bundle the library so changes are picked up
    exclude: ['shru-design-system'],
  },
})

