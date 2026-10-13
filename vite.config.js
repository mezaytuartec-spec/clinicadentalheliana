import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// URL absoluta del sitio para og:image / canonical (WhatsApp exige URLs absolutas).
// En Vercel se toma sola del dominio de producción; se puede fijar con SITE_URL.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://clinica-heliana-ortiz.vercel.app'
).replace(/\/$/, '')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
  ],
})
