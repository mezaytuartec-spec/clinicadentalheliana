// Prepara las imágenes del sitio.
// - Stock elegido: recortes fijos (ver STOCK).
// - Fotos reales: dejalas en /fotos-reales con estos nombres y corré `npm run fotos`:
//     doctora.jpg        retrato de la Dra. (vertical, idealmente ≥ 1000px de ancho)
//     consultorio.jpg    foto del consultorio
//     caso-1-antes.jpg / caso-1-despues.jpg   (hasta caso-6, mismo encuadre en ambas)
//   Aceptan .jpg, .jpeg, .png o .webp.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const out = (...p) => path.join(root, 'src/assets', ...p)

const STOCK = [
  // Paciente en sillón turquesa: recorte centrado en el rostro, sin escalar hacia arriba.
  { src: 'hero.png', name: 'img/hero', crop: { left: 630, top: 0, width: 1128, height: 895 }, widths: [1128, 760] },
  // Niño sonriendo, fondo crema: se usa a ≤ 368px CSS, así que 736px alcanza para 2x.
  { src: 'descarga (35).jpg', name: 'img/nino', widths: [736] },
]

async function emit(pipeline, name, widths, meta) {
  for (const w of widths) {
    const resized = pipeline.clone().resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
    await resized.clone().webp({ quality: 82 }).toFile(out(`${name}-${w}.webp`))
    await resized.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(out(`${name}-${w}.jpg`))
  }
}

for (const s of STOCK) {
  let p = sharp(path.join(root, s.src)).rotate()
  if (s.crop) p = p.extract(s.crop)
  const meta = s.crop ?? (await sharp(path.join(root, s.src)).metadata())
  await emit(p, s.name, s.widths, meta)
  console.log('stock  ', s.name)
}

const realDir = path.join(root, 'fotos-reales')
for (const f of fs.existsSync(realDir) ? fs.readdirSync(realDir) : []) {
  const m = f.match(/^(doctora|consultorio|caso-\d+-(?:antes|despues))\.(jpe?g|png|webp)$/i)
  if (!m) continue
  const base = sharp(path.join(realDir, f)).rotate()
  const meta = await base.metadata()
  const w = Math.min(meta.width, 1200)
  if (meta.width < 600) console.warn(`  ojo: ${f} mide ${meta.width}px de ancho, puede verse blanda en pantallas retina`)
  await base.clone().resize({ width: w }).webp({ quality: 84 }).toFile(out('fotos', `${m[1].toLowerCase()}.webp`))
  await base.clone().resize({ width: w }).jpeg({ quality: 86, mozjpeg: true }).toFile(out('fotos', `${m[1].toLowerCase()}.jpg`))
  console.log('real   ', m[1], `${meta.width}x${meta.height}`)
}
