import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages note (spec 002): with a repo named `<username>.github.io` the
// site lives at the domain root and no `base` is needed. If you ever deploy
// from a differently-named repo, add:  base: '/<repo-name>/',
export default defineConfig({
  plugins: [react()],
})
