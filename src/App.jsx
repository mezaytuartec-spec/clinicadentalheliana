import { useEffect, useRef, useState } from 'react'
import { CLINIC, SERVICES, REVIEWS, PHOTOS, MSG, waLink, mapsLink, mapsQuery } from './content.js'
import { ServiceIcon, WhatsAppIcon, InstagramIcon, Stars, Star, Sparkle, Pin, Clock, Arrow, Chat } from './icons.jsx'
import hero1128 from './assets/img/hero-1128.webp'
import hero760 from './assets/img/hero-760.webp'
import heroJpg from './assets/img/hero-1128.jpg'
import nino from './assets/img/nino-736.webp'
import ninoJpg from './assets/img/nino-736.jpg'
import logoImg from './assets/brand/logo.png'

const igLink = `https://www.instagram.com/${CLINIC.instagram}/`

/* ---------- piezas comunes ---------- */

/** Logo real de la clínica (bitmap original recoloreado, ver scripts/logo.mjs) + nombre de la Dra. al lado. */
function Logo({ size = 'sm', className = '' }) {
  const big = size === 'lg'
  return (
    <span className={`inline-flex items-center ${big ? 'gap-4' : 'gap-3'} ${className}`}>
      <img src={logoImg} alt="Clínica Dental" width={439} height={360} className={big ? 'h-[84px] w-auto' : 'h-[50px] w-auto sm:h-[54px]'} />
      <span className={`border-l border-petrol-900/12 leading-tight ${big ? 'pl-4' : 'pl-3'}`}>
        <span className={`block font-display font-medium text-petrol-900 ${big ? 'text-[1.25rem]' : 'text-[1.02rem]'}`}>Dra. Heliana Ortiz</span>
        <span className={`block text-ink-soft ${big ? 'text-[0.85rem]' : 'text-[0.72rem]'}`}>Ortodoncia · Odontopediatría</span>
      </span>
    </span>
  )
}

function WaButton({ msg, children = 'Escribinos por WhatsApp', className = '', variant = 'btn-wa' }) {
  return (
    <a href={waLink(msg)} target="_blank" rel="noopener" className={`${variant} ${className}`}>
      <WhatsAppIcon className="size-5 shrink-0" />
      {children}
    </a>
  )
}

function Picture({ webp, jpg, alt, className, sizes, srcSet, loading = 'lazy', ...rest }) {
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet ?? webp} sizes={sizes} />
      <img src={jpg} alt={alt} className={className} loading={loading} decoding="async" {...rest} />
    </picture>
  )
}

/** Espacio reservado con estética de marca para una foto real que todavía no llegó. */
function PhotoSlot({ label, className = '', tone = 'cream' }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${dark ? 'bg-petrol-800 text-aqua-200' : 'bg-gradient-to-br from-aqua-50 via-cream-50 to-cream-200 text-petrol-700'} ${className}`}
      role="img"
      aria-label={label}
    >
      <Sparkle className="twinkle absolute top-[14%] right-[16%] size-5 text-aqua-400/80" />
      <Sparkle className="absolute bottom-[18%] left-[14%] size-3 text-aqua-400/60" />
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <svg viewBox="0 0 120 40" className="w-20 opacity-80" aria-hidden="true">
          <path d="M8 8c22 30 82 30 104 0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <span className="text-[0.78rem] font-medium tracking-wide opacity-75">{label}</span>
      </div>
    </div>
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('is-in'))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('is-in'), io.unobserve(e.target))),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function SectionHead({ eyebrow, title, children, center = false, light = false }) {
  return (
    <div className={`reveal max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow flex items-center gap-2 ${center ? 'justify-center' : ''} ${light ? 'text-aqua-400' : ''}`}>
        <Sparkle className="size-3" /> {eyebrow}
      </p>
      <h2 className={`mt-3 text-[2rem] leading-[1.08] font-medium tracking-[-0.015em] sm:text-[2.6rem] ${light ? 'text-white' : ''}`}>{title}</h2>
      {children && <p className={`mt-4 text-[1.06rem] leading-relaxed ${light ? 'text-aqua-100/80' : 'text-ink-soft'}`}>{children}</p>}
    </div>
  )
}

/* ---------- secciones ---------- */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = [
    ['#casos', 'Casos'],
    ['#nosotros', 'Nosotros'],
    ['#servicios', 'Servicios'],
    ['#opiniones', 'Opiniones'],
    ['#contacto', 'Contacto'],
  ]
  return (
    <header className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${scrolled ? 'bg-cream-100/85 shadow-[0_1px_0_rgb(13_68_72/0.08)] backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-[4.75rem] max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <a href="#inicio" aria-label="Clínica Dental Dra. Heliana Ortiz, inicio">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 text-[0.95rem] font-medium text-ink-soft lg:flex" aria-label="Secciones">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-petrol-800">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={igLink} target="_blank" rel="noopener" aria-label="Instagram de la clínica" className="grid size-11 place-items-center rounded-full text-petrol-800 transition-colors hover:bg-aqua-100">
            <InstagramIcon />
          </a>
          <WaButton className="hidden !px-5 !py-2.5 text-[0.92rem] sm:inline-flex">Agendá tu consulta</WaButton>
        </div>
      </div>
    </header>
  )
}

function BookingCard({ className = '' }) {
  const [msg, setMsg] = useState('')
  return (
    <div className={`rounded-[1.75rem] bg-white/90 p-5 shadow-[0_24px_60px_-28px_rgb(8_43_46/0.45)] ring-1 ring-petrol-900/5 backdrop-blur-md sm:p-6 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua-100 text-petrol-800 lg:hidden">
          <Chat className="size-5" />
        </span>
        <div>
          <p className="font-display text-[1.2rem] leading-tight font-medium text-petrol-900">Agendá tu consulta</p>
          <p className="text-[0.84rem] text-ink-soft">Te respondemos por WhatsApp</p>
        </div>
      </div>
      <label htmlFor="motivo" className="mt-5 block text-[0.8rem] font-semibold text-ink-soft">¿Qué necesitás?</label>
      <div className="relative mt-1.5">
        <select
          id="motivo"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-petrol-900/10 bg-cream-50 pr-10 pl-4 text-[0.98rem] text-ink outline-none transition focus:border-aqua-500 focus:ring-2 focus:ring-aqua-200"
        >
          <option value="">Una consulta general</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.msg}>{s.title}</option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-petrol-700" aria-hidden="true">
          <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <WaButton msg={msg || undefined} className="mt-3 w-full !px-4">Consultar ahora</WaButton>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.78rem] text-ink-soft">
        <Clock className="size-3.5" /> Lun a vie · 9 a 12 y 15 a 19 h
      </p>
    </div>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative -mt-[4.75rem] overflow-hidden pt-[4.75rem]">
      {/* degradé suave de marca */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_85%_-10%,var(--color-aqua-100),transparent_60%),radial-gradient(40rem_30rem_at_-10%_30%,var(--color-cream-200),transparent_60%)]" />
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 pt-6 pb-14 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-12 lg:pt-12 lg:pb-24">
        <div className="relative">
          <p className="eyebrow flex items-center gap-2">
            <Sparkle className="size-3" /> Clínica dental en Treinta y Tres
          </p>
          <h1 className="mt-4 text-[2.4rem] leading-[1.04] font-medium tracking-[-0.025em] sm:text-[3.2rem] lg:text-[3.6rem]">
            22+ años creando sonrisas en un ambiente de <em className="font-medium text-aqua-600 italic">confianza y cuidado</em>
          </h1>
          <p className="mt-5 max-w-[34rem] text-[1.12rem] leading-relaxed text-ink-soft sm:text-[1.2rem]">
            Somos la clínica de la Dra. Heliana Ortiz, especialista en ortodoncia y odontopediatría, en Treinta y Tres. Atendemos a chicos y grandes, y te explicamos cada paso antes de empezar.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WaButton className="hidden sm:inline-flex" />
            <a href="#casos" className="btn-ghost w-full sm:w-auto">
              Ver casos reales <Arrow />
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9rem] text-ink-soft">
            <li className="flex items-center gap-2">
              <Stars className="size-4 text-amber-400" />
              <span><b className="font-semibold text-petrol-900">5.0</b> en Google · 10 reseñas</span>
            </li>
            <li className="flex items-center gap-2"><Clock className="size-4 text-aqua-600" /> Lun a vie · 9–12 y 15–19 h</li>
            <li className="flex items-center gap-2"><Pin className="size-4 text-aqua-600" /> Blvd. Juan Ortiz 542</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[564px] lg:mr-0">
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rotate-[-3deg] rounded-[2.75rem] bg-gradient-to-br from-aqua-200/70 to-aqua-50/0" />
          <Sparkle className="twinkle absolute -top-4 right-6 z-10 size-7 text-aqua-400" />
          <Sparkle className="twinkle absolute top-10 -right-3 z-10 size-4 text-petrol-700/60" style={{ animationDelay: '1.2s' }} />
          <div className="overflow-hidden rounded-[2.5rem] bg-aqua-50">
            <Picture
              srcSet={`${hero760} 760w, ${hero1128} 1128w`}
              sizes="(min-width: 640px) 564px, calc(100vw - 32px)"
              jpg={heroJpg}
              alt="Paciente sonriendo en el sillón del consultorio"
              width={1128}
              height={895}
              loading="eager"
              fetchpriority="high"
              className="aspect-[1128/895] w-full object-cover"
            />
          </div>
          <BookingCard className="relative z-10 mx-3 -mt-16 sm:mx-auto sm:max-w-[360px] lg:absolute lg:-right-8 lg:-bottom-20 lg:mx-0 lg:mt-0 lg:w-[256px] lg:p-5" />
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const items = [
    { big: '22+', small: 'años de experiencia' },
    { big: <>5.0 <Star className="inline size-6 -translate-y-0.5 text-amber-400" /></>, small: 'de calificación en Google' },
    { big: '10', small: 'reseñas de pacientes' },
    { big: '2', small: 'especialidades: ortodoncia y odontopediatría' },
  ]
  return (
    <section aria-label="La clínica en números" className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-petrol-900/8 ring-1 ring-petrol-900/8 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="bg-white/80 px-5 py-6 sm:px-7 sm:py-7">
            <p className="font-display text-[2.3rem] leading-none font-medium text-petrol-800 sm:text-[2.7rem]">{it.big}</p>
            <p className="mt-2 text-[0.9rem] leading-snug text-ink-soft">{it.small}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function BeforeAfter({ before, after, index }) {
  const [pos, setPos] = useState(50)
  const box = useRef(null)
  const dragging = useRef(false)
  const move = (clientX) => {
    const r = box.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }
  return (
    <div
      ref={box}
      className="relative aspect-square sm:aspect-[4/5] cursor-ew-resize touch-pan-y overflow-hidden rounded-[1.75rem] bg-petrol-800 select-none"
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX) }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Picture webp={after.webp} jpg={after.jpg} alt={`Caso ${index + 1}: después del tratamiento`} draggable={false} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Picture webp={before.webp} jpg={before.jpg} alt={`Caso ${index + 1}: antes del tratamiento`} draggable={false} className="absolute inset-0 size-full object-cover" />
      </div>
      <span className="absolute top-3 left-3 rounded-full bg-petrol-950/70 px-3 py-1 text-[0.75rem] font-semibold text-white backdrop-blur">Antes</span>
      <span className="absolute top-3 right-3 rounded-full bg-aqua-400/90 px-3 py-1 text-[0.75rem] font-semibold text-petrol-950">Después</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90" style={{ left: `${pos}%` }} />
      <button
        type="button"
        role="slider"
        aria-label={`Comparar antes y después, caso ${index + 1}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
          if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
        }}
        className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-petrol-800 shadow-lg"
        style={{ left: `${pos}%` }}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}

function CasePlaceholder({ index }) {
  return (
    <div className="relative grid aspect-square sm:aspect-[4/5] grid-cols-2 overflow-hidden rounded-[1.75rem] ring-1 ring-white/10" role="img" aria-label={`Espacio para el caso real ${index + 1}`}>
      <div className="bg-petrol-800" />
      <div className="bg-gradient-to-br from-petrol-700 to-aqua-600/60" />
      <span className="absolute top-3 left-3 rounded-full bg-petrol-950/60 px-3 py-1 text-[0.75rem] font-semibold text-white">Antes</span>
      <span className="absolute top-3 right-3 rounded-full bg-aqua-400/90 px-3 py-1 text-[0.75rem] font-semibold text-petrol-950">Después</span>
      <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/50" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-gradient-to-t from-petrol-950/80 to-transparent px-4 pt-14 pb-5 text-center">
        <Sparkle className="size-4 text-aqua-400" />
        <span className="text-[0.85rem] font-medium text-white/85">Caso real de la clínica</span>
        <span className="text-[0.75rem] text-aqua-200/70">Foto en camino</span>
      </div>
    </div>
  )
}

function Cases() {
  const cases = PHOTOS.cases
  const slots = cases.length ? cases : [0, 1, 2]
  return (
    <section id="casos" className="px-3 pt-20 sm:px-6 lg:pt-28">
      <div className="relative mx-auto max-w-[1340px] overflow-hidden rounded-[2.25rem] bg-petrol-900 px-5 py-14 sm:rounded-[2.75rem] sm:px-10 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_26rem_at_100%_0%,rgb(47_179_163/0.28),transparent_65%),radial-gradient(30rem_24rem_at_0%_100%,rgb(95_208_191/0.12),transparent_60%)]" />
        <Sparkle className="twinkle absolute top-10 right-10 size-6 text-aqua-400/70" />
        <Sparkle className="twinkle absolute top-24 right-24 size-3 text-aqua-200/60" style={{ animationDelay: '1.5s' }} />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead eyebrow="Antes y después" title="Sonrisas reales de nuestros pacientes" light>
            Cada caso es distinto, pero todos empiezan igual: con una consulta donde te escuchamos y te explicamos las opciones.
            {cases.length > 0 && ' Deslizá para comparar.'}
          </SectionHead>
          <WaButton msg={MSG.cases} variant="btn" className="reveal shrink-0 self-start bg-aqua-400 text-petrol-950 hover:bg-aqua-200 lg:self-auto">
            Contanos tu caso
          </WaButton>
        </div>
        <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {slots.map((c, i) => (
            <div key={i} className={`reveal ${!cases.length && i > 0 ? 'hidden sm:block' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
              {cases.length ? <BeforeAfter {...c} index={i} /> : <CasePlaceholder index={i} />}
            </div>
          ))}
        </div>
        <p className="relative mt-6 text-[0.82rem] text-aqua-100/55">Fotos de tratamientos realizados en la clínica, compartidas con autorización. Los resultados varían en cada persona.</p>
      </div>
    </section>
  )
}

function About() {
  const { doctora, consultorio } = PHOTOS
  return (
    <section id="nosotros" className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6 lg:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-[340px] sm:max-w-[440px]">
          <div aria-hidden="true" className="absolute -inset-4 -z-10 rotate-[3deg] rounded-[2.75rem] bg-aqua-100" />
          {doctora ? (
            <Picture webp={doctora.webp} jpg={doctora.jpg} alt="Dra. Heliana Ortiz" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover" />
          ) : (
            <PhotoSlot label="Foto de la Dra. Heliana Ortiz" className="aspect-[4/5] w-full rounded-[2.5rem]" />
          )}
          <div className="absolute -right-2 -bottom-6 w-[46%] overflow-hidden rounded-[1.5rem] ring-[6px] ring-cream-100 sm:-right-8">
            {consultorio ? (
              <Picture webp={consultorio.webp} jpg={consultorio.jpg} alt="Consultorio de la clínica" className="aspect-square w-full object-cover" />
            ) : (
              <PhotoSlot label="El consultorio" tone="dark" className="aspect-square w-full" />
            )}
          </div>
          <Sparkle className="twinkle absolute -top-5 -left-3 size-7 text-aqua-400" />
        </div>

        <div>
          <SectionHead eyebrow="Quiénes somos" title={<>Una clínica familiar, con <em className="text-aqua-600 italic">22+ años</em> de trayectoria</>} />
          <div className="reveal mt-5 space-y-4 text-[1.06rem] leading-relaxed text-ink-soft">
            <p>
              Somos la clínica de la <b className="font-semibold text-petrol-900">Dra. Heliana Ortiz</b>, especialista en ortodoncia y odontopediatría.
              Atendemos a familias enteras: a los chicos en sus primeras visitas, a los adolescentes con brackets y a los grandes en lo que necesiten.
            </p>
            <p>
              Nos gusta trabajar con tiempo. Antes de cada tratamiento te contamos qué vamos a hacer y por qué, así venís tranquilo y sabés qué esperar.
            </p>
          </div>
          <p className="reveal mt-8 flex items-start gap-3 rounded-[1.5rem] bg-white p-5 text-[0.95rem] text-ink-soft ring-1 ring-petrol-900/6">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-aqua-100 text-petrol-800"><ServiceIcon name="molar" className="size-4.5" /></span>
            <span>Para cirugía de muelas de juicio trabajamos con la <b className="font-semibold text-petrol-900">Dra. Pilar Correa</b>, profesional invitada de la clínica.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const specialties = SERVICES.filter((s) => s.specialty)
  const rest = SERVICES.filter((s) => !s.specialty)
  return (
    <section id="servicios" className="mx-auto max-w-[1240px] px-4 pt-24 sm:px-6 lg:pt-32">
      <SectionHead eyebrow="Servicios" title="Todo lo que necesita tu sonrisa, en un solo lugar">
        Tocá un servicio y te abrimos WhatsApp con la consulta ya escrita.
      </SectionHead>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {specialties.map((s, i) => (
          <a
            key={s.id}
            href={waLink(s.msg)}
            target="_blank"
            rel="noopener"
            className="reveal group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-aqua-100 via-aqua-50 to-cream-50 p-6 ring-1 ring-aqua-200/70 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgb(13_68_72/0.5)] sm:p-8"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Sparkle className="absolute top-6 right-6 size-4 text-aqua-500/70" />
            <span className="grid size-16 place-items-center rounded-[1.25rem] bg-white text-petrol-800 shadow-sm">
              <ServiceIcon name={s.icon} className="size-9" />
            </span>
            <p className="mt-6 text-[0.72rem] font-semibold tracking-[0.16em] text-aqua-600 uppercase">Especialidad</p>
            <h3 className="mt-1 text-[1.75rem] leading-tight font-medium">{s.title}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{s.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-petrol-800">
              Consultar por WhatsApp <Arrow className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {rest.map((s, i) => (
          <a
            key={s.id}
            href={waLink(s.msg)}
            target="_blank"
            rel="noopener"
            className="reveal group flex flex-col rounded-[1.6rem] bg-white p-4 ring-1 ring-petrol-900/6 transition duration-300 hover:-translate-y-0.5 hover:ring-aqua-400/60 hover:shadow-[0_20px_40px_-30px_rgb(13_68_72/0.5)] sm:p-6"
            style={{ transitionDelay: `${(i % 4) * 60}ms` }}
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-aqua-50 text-petrol-800 transition-colors group-hover:bg-aqua-100 sm:size-14">
              <ServiceIcon name={s.icon} className="size-7 sm:size-8" />
            </span>
            <h3 className="mt-4 font-sans text-[1rem] leading-snug font-semibold text-petrol-900 sm:text-[1.08rem]">{s.title}</h3>
            <p className="mt-1.5 flex-1 text-[0.86rem] leading-relaxed text-ink-soft sm:text-[0.92rem]">{s.text}</p>
            {s.guest && <span className="mt-3 self-start rounded-full bg-cream-200 px-2.5 py-1 text-[0.7rem] font-semibold text-petrol-700">Profesional invitada</span>}
            <span className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-aqua-600">
              Consultar <Arrow className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Kids() {
  const points = [
    'Les explicamos todo con palabras simples, antes de empezar.',
    'Vamos a su ritmo, con paciencia y cariño.',
    'Acompañamos su crecimiento, y su ortodoncia si la necesita.',
  ]
  return (
    <section id="ninos" className="px-3 pt-24 sm:px-6 lg:pt-32">
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 overflow-hidden rounded-[2.25rem] bg-cream-200 px-5 py-12 sm:rounded-[2.75rem] sm:px-10 md:grid-cols-[minmax(0,320px)_1fr] lg:grid-cols-[368px_1fr] lg:gap-16 lg:px-16 lg:py-16">
        <Sparkle className="twinkle absolute top-8 right-10 size-6 text-aqua-500/70" />
        <div className="reveal relative mx-auto w-full max-w-[340px] lg:max-w-[368px]">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[48%_52%_44%_56%/52%_44%_56%_48%] bg-aqua-200/70" />
          <Picture
            webp={nino}
            jpg={ninoJpg}
            alt="Nene mostrando su sonrisa"
            width={736}
            height={736}
            className="relative aspect-square w-full rounded-[48%_52%_44%_56%/52%_44%_56%_48%] object-cover"
          />
          <Sparkle className="twinkle absolute -top-2 left-4 size-6 text-petrol-700" style={{ animationDelay: '.8s' }} />
        </div>
        <div>
          <SectionHead eyebrow="Para los más chicos" title="Que la primera visita al dentista sea un buen recuerdo">
            La odontopediatría es una de nuestras especialidades. Recibimos a los chicos en un ambiente tranquilo, con los padres siempre cerca.
          </SectionHead>
          <ul className="reveal mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[1rem] text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-petrol-800 text-aqua-200">
                  <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 10.5 3.2 3L15 7" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
          <WaButton msg={MSG.kids} className="reveal mt-8 w-full sm:w-auto">
            Agendá la consulta de tu hijo/a
          </WaButton>
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="opiniones" className="pt-24 lg:pt-32">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead eyebrow="Opiniones" title="Lo que dicen nuestros pacientes" />
        <a href={mapsLink} target="_blank" rel="noopener" className="reveal flex items-center gap-4 self-start rounded-[1.5rem] bg-white px-5 py-4 ring-1 ring-petrol-900/6 transition hover:ring-aqua-400/60 lg:self-auto">
          <span className="font-display text-[2.6rem] leading-none font-medium text-petrol-800">5.0</span>
          <span>
            <Stars className="size-4.5 text-amber-400" />
            <span className="mt-1 block text-[0.86rem] text-ink-soft">10 reseñas en Google</span>
          </span>
        </a>
      </div>

      <div className="mx-auto mt-10 max-w-[1240px]">
        <ul className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {REVIEWS.map((r, i) => (
            <li
              key={r.name}
              className={`reveal flex w-[82%] shrink-0 snap-start flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-petrol-900/6 sm:w-[46%] lg:w-auto ${i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Stars className="size-4 text-amber-400" />
              <blockquote className="mt-4 flex-1 text-[1.04rem] leading-relaxed text-ink">“{r.text}”</blockquote>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-aqua-100 font-display text-[1rem] font-semibold text-petrol-800" aria-hidden="true">
                  {r.name[0]}
                </span>
                <span>
                  <span className="block text-[0.95rem] font-semibold text-petrol-900">{r.name}</span>
                  <span className="block text-[0.78rem] text-ink-soft">Reseña en Google</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Location() {
  return (
    <section id="contacto" className="mx-auto max-w-[1240px] px-4 pt-24 sm:px-6 lg:pt-32">
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal flex flex-col rounded-[2rem] bg-white p-6 ring-1 ring-petrol-900/6 sm:p-9">
          <p className="eyebrow flex items-center gap-2"><Sparkle className="size-3" /> Dónde estamos</p>
          <h2 className="mt-3 text-[2rem] leading-tight font-medium sm:text-[2.4rem]">Te esperamos en Treinta y Tres</h2>
          <dl className="mt-7 space-y-5 text-[1rem]">
            <div className="flex gap-4">
              <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua-50 text-petrol-800"><Pin /><span className="sr-only">Dirección</span></dt>
              <dd>
                <span className="block font-semibold text-petrol-900">{CLINIC.address}</span>
                <span className="text-ink-soft">{CLINIC.city}</span>
                <a href={mapsLink} target="_blank" rel="noopener" className="mt-1 flex items-center gap-1 text-[0.9rem] font-semibold text-aqua-600 hover:underline">
                  Cómo llegar <Arrow className="size-3.5" />
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua-50 text-petrol-800"><Clock /><span className="sr-only">Horarios</span></dt>
              <dd>
                <span className="block font-semibold text-petrol-900">Lunes a viernes</span>
                <span className="text-ink-soft">9:00 a 12:00 · 15:00 a 19:00</span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua-50 text-petrol-800"><WhatsAppIcon /><span className="sr-only">WhatsApp</span></dt>
              <dd>
                <a href={waLink()} target="_blank" rel="noopener" className="block font-semibold text-petrol-900 hover:text-aqua-600">{CLINIC.phone}</a>
                <span className="text-ink-soft">Agendá y consultá por WhatsApp</span>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua-50 text-petrol-800"><InstagramIcon /><span className="sr-only">Instagram</span></dt>
              <dd className="self-center">
                <a href={igLink} target="_blank" rel="noopener" className="font-semibold text-petrol-900 hover:text-aqua-600">@{CLINIC.instagram}</a>
              </dd>
            </div>
          </dl>
          <WaButton className="mt-8 w-full sm:w-auto sm:self-start" />
        </div>
        <div className="reveal min-h-[340px] overflow-hidden rounded-[2rem] bg-aqua-50 ring-1 ring-petrol-900/6 lg:min-h-full">
          <iframe
            title="Mapa: Blvd. Juan Ortiz 542, Treinta y Tres"
            src={`https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`}
            className="block size-full min-h-[340px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="px-3 pt-24 sm:px-6 lg:pt-32">
      <div className="reveal relative mx-auto max-w-[1240px] overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-petrol-800 via-petrol-700 to-aqua-600 px-6 py-14 text-center sm:rounded-[2.75rem] sm:py-20">
        <Sparkle className="twinkle absolute top-8 left-[12%] size-6 text-aqua-200/80" />
        <Sparkle className="twinkle absolute right-[10%] bottom-10 size-8 text-aqua-200/60" style={{ animationDelay: '1s' }} />
        <svg viewBox="0 0 120 30" className="mx-auto w-24" aria-hidden="true">
          <path d="M8 6c22 24 82 24 104 0" fill="none" stroke="var(--color-aqua-400)" strokeWidth="6" strokeLinecap="round" />
        </svg>
        <h2 className="mx-auto mt-5 max-w-2xl text-[2.1rem] leading-[1.08] font-medium text-white sm:text-[3rem]">¿Agendamos tu próxima consulta?</h2>
        <p className="mx-auto mt-4 max-w-lg text-[1.08rem] text-aqua-100/85">Escribinos por WhatsApp y coordinamos el día y la hora que te queden mejor.</p>
        <WaButton variant="btn" className="mt-8 bg-white text-petrol-900 shadow-[0_14px_40px_-16px_rgb(0_0_0/0.5)] hover:bg-cream-100" />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mx-auto max-w-[1240px] px-4 pt-16 pb-28 sm:px-6 lg:pb-12">
      <div className="flex flex-col gap-8 border-t border-petrol-900/10 pt-10 md:flex-row md:items-center md:justify-between">
        <Logo size="lg" />
        <p className="text-[0.9rem] text-ink-soft">
          {CLINIC.address}, {CLINIC.city} · Lun a vie 9–12 y 15–19 h
        </p>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-white text-petrol-800 ring-1 ring-petrol-900/8 hover:bg-aqua-100"><WhatsAppIcon /></a>
          <a href={igLink} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-11 place-items-center rounded-full bg-white text-petrol-800 ring-1 ring-petrol-900/8 hover:bg-aqua-100"><InstagramIcon /></a>
        </div>
      </div>
      <p className="mt-8 text-[0.8rem] text-ink-soft/80">© {new Date().getFullYear()} {CLINIC.name}</p>
    </footer>
  )
}

/** Barra fija en mobile + botón flotante en desktop: WhatsApp siempre a mano. */
function StickyWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 560)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-petrol-900/8 bg-cream-50/92 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <WaButton className="w-full !py-3.5">Escribinos por WhatsApp</WaButton>
      </div>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        aria-label="Escribinos por WhatsApp"
        className={`fixed right-6 bottom-6 z-50 hidden items-center gap-2.5 rounded-full bg-petrol-800 py-3.5 pr-6 pl-5 font-semibold text-white shadow-[0_18px_40px_-14px_rgb(8_43_46/0.7)] transition duration-300 hover:bg-petrol-700 lg:flex ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      >
        <WhatsAppIcon className="size-6 text-aqua-400" /> Escribinos
      </a>
    </>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Stats />
        <Cases />
        <About />
        <Services />
        <Kids />
        <Reviews />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}
