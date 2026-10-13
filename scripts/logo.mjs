// Toma el logo real (brand/logo-original.webp, negro sobre blanco) y genera versiones a color
// SIN redibujarlo: se usa el mismo bitmap como máscara y solo se cambia el color de cada parte.
//   - texto "Clínica Dental" → verde petróleo
//   - punto + arco de sonrisa → turquesa
import sharp from 'sharp'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const SRC = path.join(root, 'brand/logo-original.webp')
const PETROL = [13, 68, 72], AQUA = [47, 179, 163], WHITE = [255, 255, 255]

const { data, info } = await sharp(SRC).greyscale().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = info

// Alfa = tinta del logo (negro → opaco), con una curva suave para limpiar el ruido de compresión.
const alpha = new Uint8Array(W * H)
for (let i = 0; i < W * H; i++) {
  const ink = 255 - data[i]
  alpha[i] = ink < 40 ? 0 : ink > 215 ? 255 : Math.round(((ink - 40) / 175) * 255)
}

// Regiones del logo original (en px de la imagen fuente): bloque de texto arriba a la izquierda.
const isText = (x, y) => x < 900 && y < 545

async function render(name, colorFor, { keep = () => true, height } = {}) {
  const rgba = Buffer.alloc(W * H * 4)
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, a = keep(x, y) ? alpha[i] : 0
    const [r, g, b] = colorFor(x, y)
    rgba.set([r, g, b, a], i * 4)
  }
  let img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).trim({ threshold: 1 })
  const buf = await img.png().toBuffer()
  const out = sharp(buf).resize({ height, withoutEnlargement: true })
  await out.png({ compressionLevel: 9 }).toFile(path.join(root, 'src/assets/brand', `${name}.png`))
  console.log('ok', name)
}

const twoTone = (x, y) => (isText(x, y) ? PETROL : AQUA)
await render('logo', twoTone, { height: 360 })                       // header / footer
await render('logo-white', (x, y) => (isText(x, y) ? WHITE : [95, 208, 191]), { height: 360 }) // sobre fondo oscuro
await render('logo-og', twoTone, { height: 600 })                    // og:image
await render('isotipo', () => AQUA, { keep: (x, y) => !isText(x, y), height: 512 }) // solo punto + sonrisa

// Favicons: isotipo real (punto + sonrisa) en turquesa claro sobre verde petróleo.
for (const [file, size] of [['favicon.png', 64], ['apple-touch-icon.png', 180]]) {
  const pad = Math.round(size * 0.18)
  const mark = await sharp(path.join(root, 'src/assets/brand/isotipo.png'))
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .tint({ r: 95, g: 208, b: 191 }).png().toBuffer()
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${size * 0.24}" fill="#0d4448"/></svg>`)
  await sharp(bg).composite([{ input: mark, top: pad, left: pad }]).png().toFile(path.join(root, 'public', file))
  console.log('ok', file)
}
