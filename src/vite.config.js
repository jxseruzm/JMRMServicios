import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Aumentar el límite de advertencia de chunk size
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Configuración manual de chunks para mejor optimización
        manualChunks: {
          // Vendor chunks - librerías de terceros
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['motion/react'],
          'vendor-icons': ['lucide-react'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast'
          ],
          
          // UI Components chunk
          'ui-components': [
            './components/ui/button',
            './components/ui/card',
            './components/ui/badge',
            './components/ui/dialog',
            './components/ui/collapsible',
            './components/ui/tooltip'
          ],
          
          // Main sections chunks
          'sections-primary': [
            './components/AboutSection',
            './components/HeroSection'
          ],
          'sections-secondary': [
            './components/ServicesSection',
            './components/SkillsSection'
          ],
          'sections-projects': [
            './components/ProjectsSection',
            './components/ExperienceSection'
          ],
          'sections-contact': [
            './components/ContactSection',
            './components/Footer'
          ],
          
          // Floating components
          'floating-components': [
            './components/SocialFloatingButtons',
            './components/FAQAssistant'
          ]
        }
      }
    },
    // Optimizaciones adicionales
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimizaciones para desarrollo
  server: {
    hmr: {
      overlay: false
    }
  }
});