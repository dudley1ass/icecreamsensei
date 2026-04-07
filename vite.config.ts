import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // When deploying under a subpath, set `base` (e.g. `/tools/ice-cream/`).
  // `joinBase` / `stripAppPath` in `src/app/routing.ts` read `import.meta.env.BASE_URL`.
})
