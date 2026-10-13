export const CLINIC = {
  name: 'Clínica Dental Dra. Heliana Ortiz',
  doctor: 'Dra. Heliana Ortiz',
  phone: '+598 99 857 228',
  wa: '59899857228',
  instagram: 'dra.ortiz.heliana',
  address: 'Blvd. Juan Ortiz 542',
  city: 'Treinta y Tres, Uruguay',
  hours: [
    { days: 'Lunes a viernes', time: '9:00 a 12:00' },
    { days: '', time: '15:00 a 19:00' },
  ],
  quote: '22+ años creando sonrisas en un ambiente de confianza y cuidado.',
  rating: '5.0',
  reviewsCount: 10,
}

export const mapsQuery = encodeURIComponent('Blvd. Juan Ortiz 542, Treinta y Tres, Uruguay')
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`

/** Link a WhatsApp con el mensaje prellenado según lo que eligió la persona. */
export function waLink(msg = '¡Hola! Quisiera agendar una consulta en la clínica.') {
  const text = `${msg} ¿Qué días tienen disponibles?`
  return `https://wa.me/${CLINIC.wa}?text=${encodeURIComponent(text)}`
}

const ask = (what) => `¡Hola! Quisiera consultar por ${what}.`
export const MSG = {
  kids: '¡Hola! Quisiera agendar una consulta para mi hijo/a (odontopediatría).',
  cases: '¡Hola! Vi los casos de antes y después en la web y quisiera consultar por mi caso.',
}

// `msg` es el mensaje de WhatsApp que se abre al tocar el servicio.
export const SERVICES = [
  {
    id: 'ortodoncia', icon: 'braces', title: 'Ortodoncia', msg: ask('ortodoncia (brackets)'), specialty: true,
    text: 'Tratamientos con brackets para chicos, adolescentes y adultos. Te explicamos cada etapa y te acompañamos en los controles hasta el final.',
  },
  {
    id: 'odontopediatria', icon: 'kid', title: 'Odontopediatría', msg: MSG.kids, specialty: true,
    text: 'La primera visita al dentista marca mucho. Atendemos a los más chicos con paciencia, a su ritmo y con los padres al lado.',
  },
  { id: 'fracturas', icon: 'fracture', title: 'Fracturas con resina', msg: '¡Hola! Tengo un diente fracturado y quisiera consultar por la reparación con resina.', text: 'Reparamos dientes fracturados con resina en una sola sesión.' },
  { id: 'coronas', icon: 'crown', title: 'Coronas', msg: ask('coronas'), text: 'Para proteger y devolverle la forma a un diente muy dañado.' },
  { id: 'endodoncia', icon: 'root', title: 'Endodoncia', msg: ask('endodoncia'), text: 'Tratamiento de conducto para conservar tu propio diente.' },
  { id: 'protesis', icon: 'denture', title: 'Prótesis', msg: ask('prótesis'), text: 'Removibles y sobre implantes, hechas a tu medida.' },
  { id: 'implantes', icon: 'implant', title: 'Implantes', msg: ask('implantes'), text: 'Una opción fija para reponer piezas que faltan.' },
  { id: 'extracciones', icon: 'extract', title: 'Extracciones', msg: ask('una extracción'), text: 'Con cuidado y explicándote todo antes de empezar.' },
  { id: 'limpieza', icon: 'clean', title: 'Limpieza y reconstrucción', msg: ask('limpieza y reconstrucción'), text: 'Controles, limpiezas y arreglos para mantener tu boca sana.' },
  {
    id: 'muelas', icon: 'molar', title: 'Muelas de juicio', msg: ask('cirugía de muelas de juicio'), guest: true,
    text: 'Cirugía con la Dra. Pilar Correa, profesional invitada de la clínica.',
  },
]

export const REVIEWS = [
  { name: 'Sol Gorosito', text: 'Me explica absolutamente todo lo que me va a hacer antes de hacerlo y es muy cuidadosa y amable.' },
  { name: 'Tatiana Diaz', text: 'Muy contenta con todo el tratamiento. Excelente trato, muy amorosa y empática con los pacientes.' },
  { name: 'Ana Paula Fernández', text: 'Tuve un excelente tratamiento con los brackets y la atención excelente. Gracias a Helianita tengo una hermosa sonrisa.' },
  { name: 'Gretel Texeira', text: 'Pude terminar mi tratamiento de brackets con buenos resultados. Muy buena mano para extracciones.' },
  { name: 'Carina Techera', text: 'Fui con un problema y me lo resolvió, gracias por solucionar mi problema rápido, muy empática.' },
]

/*
 * Fotos reales: se detectan solas desde src/assets/fotos (las genera `npm run fotos`
 * a partir de /fotos-reales). Donde falta una, el sitio muestra un espacio de marca.
 */
const real = import.meta.glob('./assets/fotos/*.{webp,jpg}', { eager: true, query: '?url', import: 'default' })
const pick = (name) => {
  const webp = real[`./assets/fotos/${name}.webp`]
  const jpg = real[`./assets/fotos/${name}.jpg`]
  return webp || jpg ? { webp, jpg: jpg ?? webp } : null
}

export const PHOTOS = {
  doctora: pick('doctora'),
  consultorio: pick('consultorio'),
  cases: Array.from({ length: 6 }, (_, i) => ({ before: pick(`caso-${i + 1}-antes`), after: pick(`caso-${i + 1}-despues`) }))
    .filter((c) => c.before && c.after),
}
