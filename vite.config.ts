import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' -> le build fonctionne depuis n'importe quel sous-dossier
// (ex: https://domaine.tld/cs-55-7f3k9x/) sans reconfiguration.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2018',
    assetsInlineLimit: 8192,
  },
})
