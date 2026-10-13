# Clínica Dental Dra. Heliana Ortiz — landing

Vite + React + Tailwind v4. Se despliega en Vercel tal cual (output `dist/`).

```
npm install
npm run dev      # desarrollo
npm run build    # producción → dist/
```

## Fotos reales (doctora, consultorio, antes/después)

1. Copiá las fotos a `fotos-reales/` con estos nombres (jpg/png/webp):
   `doctora`, `consultorio`, `caso-1-antes` / `caso-1-despues` … hasta `caso-6`.
2. `npm run fotos` — las optimiza y el sitio las toma solo (donde falta una, muestra un espacio de marca).
3. `npm run og` — regenera `public/og-image.jpg` (1200×630) con la foto de la Dra.

## URL absoluta del og:image

En Vercel se toma sola del dominio de producción. Para un dominio propio, definí `SITE_URL=https://tudominio.uy` en las variables de entorno del proyecto.
