// Genera public/og-image.jpg (1200x630) para la vista previa en WhatsApp/redes.
// Usa la foto real de la Dra. (src/assets/fotos/doctora.jpg) si existe; si no, la foto del hero.
// El texto se convierte a trazos con las fuentes del sitio, así no depende de fuentes del sistema.
import sharp from 'sharp'
import opentype from 'opentype.js'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const font = (p) => opentype.parse(fs.readFileSync(path.join(root, 'node_modules/@fontsource', p)).buffer.slice(0))
const serif = font('fraunces/files/fraunces-latin-600-normal.woff')
const serifIt = font('fraunces/files/fraunces-latin-500-italic.woff')
const sans = font('figtree/files/figtree-latin-500-normal.woff')
const sansBold = font('figtree/files/figtree-latin-600-normal.woff')

const W = 1200, H = 630, PHOTO_W = 520
// toPathData() de opentype.js a veces emite NaN; armamos el string a mano.
const n = (v) => (+v).toFixed(2)
const pathData = (p) => p.commands.map((c) =>
  c.type === 'Z' ? 'Z' : c.type === 'Q' ? `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}` : c.type === 'C' ? `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}` : `${c.type}${n(c.x)} ${n(c.y)}`).join('')

// Maquetado glifo a glifo (sin sustituciones OpenType, que opentype.js resuelve mal en estas fuentes).
const text = (f, str, x, y, size, fill, tracking = 0) => {
  const scale = size / f.unitsPerEm
  let d = '', cx = x, prev = null
  for (const ch of str) {
    const g = f.charToGlyph(ch)
    if (prev) cx += f.getKerningValue(prev, g) * scale
    d += `<path d="${pathData(g.getPath(cx, y, size))}"/>`
    cx += g.advanceWidth * scale + tracking
    prev = g
  }
  return `<g fill="${fill}">${d}</g>`
}
const spaced = (f, str, x, y, size, fill, tracking) => text(f, str, x, y, size, fill, tracking)
const sparkle = (cx, cy, r, fill) =>
  `<path transform="translate(${cx - r} ${cy - r}) scale(${r / 12})" d="M12 0c.6 5.4 3.3 9.4 12 12-8.7 2.6-11.4 6.6-12 12-.6-5.4-3.3-9.4-12-12C8.7 9.4 11.4 5.4 12 0Z" fill="${fill}"/>`

const real = path.join(root, 'src/assets/fotos/doctora.jpg')
const photo = fs.existsSync(real)
  ? await sharp(real).resize(PHOTO_W, H, { fit: 'cover', position: 'attention' }).toBuffer()
  : await sharp(path.join(root, 'hero.png')).extract({ left: 700, top: 0, width: 739, height: 895 }).resize(PHOTO_W, H).toBuffer()

const X = 72
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="0.1" cy="0.05" r="0.9"><stop offset="0" stop-color="#dcf3ee"/><stop offset="0.6" stop-color="#fbf8f2"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="${X + 168}" y="72" width="1.5" height="84" fill="#0b3a3d" opacity="0.15"/>
  ${text(serif, 'Dra. Heliana Ortiz', X + 192, 112, 30, '#0b3a3d')}
  ${text(sans, 'Ortodoncia · Odontopediatría', X + 192, 144, 19, '#4b6663')}

  ${text(serif, '22+ años creando sonrisas', X, 268, 44, '#0b3a3d')}
  ${text(serif, 'en un ambiente de', X, 322, 44, '#0b3a3d')}
  ${text(serifIt, 'confianza y cuidado', X, 378, 46, '#1f9a8c')}
  ${text(sans, 'Blvd. Juan Ortiz 542  ·  Treinta y Tres', X, 440, 23, '#4b6663')}

  <rect x="${X}" y="490" width="312" height="66" rx="33" fill="#0d4448"/>
  ${text(sansBold, 'Agendá por WhatsApp', X + 34, 532, 24, '#ffffff')}
  ${sparkle(X + 360, 520, 9, '#f5b301')}
  ${text(sansBold, '5.0 en Google', X + 378, 532, 22, '#0b3a3d')}

  ${sparkle(600, 70, 14, '#5fd0bf')}
  ${sparkle(630, 108, 7, '#2fb3a3')}
</svg>`

const mask = Buffer.from(`<svg width="${PHOTO_W}" height="${H}"><rect x="0" y="0" width="${PHOTO_W + 60}" height="${H}" rx="56" fill="#fff"/></svg>`)
const rounded = await sharp(photo).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer()

// Logo real de la clínica (generado por scripts/logo.mjs a partir del original).
const logo = await sharp(path.join(root, 'src/assets/brand/logo-og.png')).resize({ height: 124 }).toBuffer()

await sharp(Buffer.from(svg))
  .composite([{ input: rounded, left: W - PHOTO_W, top: 0 }, { input: logo, left: X, top: 52 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'))
console.log('public/og-image.jpg listo', fs.existsSync(real) ? '(con foto de la Dra.)' : '(sin foto de la Dra.: usando la foto del hero)')
