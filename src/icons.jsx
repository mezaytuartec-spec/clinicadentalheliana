const TOOTH =
  'M8 3C5.5 3 4 5 4.3 7.8c.3 2.6 1.3 4.2 1.8 6.5.5 2.3.7 6.2 2.4 6.2 1.6 0 1.7-3.5 2.5-5.1.4-.8 1.6-.8 2 0 .8 1.6.9 5.1 2.5 5.1 1.7 0 1.9-3.9 2.4-6.2.5-2.3 1.5-3.9 1.8-6.5C20 5 18.5 3 16 3c-1.7 0-2.4 1-4 1s-2.3-1-4-1Z'

function Svg({ children, className = 'size-7', strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  )
}

export const ServiceIcon = ({ name, className }) => {
  const paths = {
    braces: (
      <>
        <path d={TOOTH} />
        <path d="M3 10.6h18" />
        <rect x="9.4" y="8.4" width="5.2" height="4.4" rx="1.1" fill="var(--color-aqua-100, #fff)" />
        <path d="M12 8.4v4.4" />
      </>
    ),
    kid: (
      <>
        <path d={TOOTH} />
        <path d="M9.6 10.6c.7.9 1.5 1.3 2.4 1.3s1.7-.4 2.4-1.3" />
        <path d="M9.4 7.6h.01M14.6 7.6h.01" strokeWidth="2.4" />
      </>
    ),
    fracture: (
      <>
        <path d={TOOTH} />
        <path d="m13.2 3.9-1.8 3.3 2.3 1.5-1.6 3" />
      </>
    ),
    crown: (
      <>
        <path d="M4.5 9.5 6 5l3.2 2.6L12 3.8l2.8 3.8L18 5l1.5 4.5" />
        <path d="M5 12c.3 2 1 3.4 1.4 5.5.4 2 .6 3.5 2 3.5 1.4 0 1.6-3 2.4-4.4.4-.7.9-.7 1.2-.7s.8 0 1.2.7c.8 1.4 1 4.4 2.4 4.4 1.4 0 1.6-1.5 2-3.5.4-2.1 1.1-3.5 1.4-5.5" />
        <path d="M4.5 9.5h15" />
      </>
    ),
    root: (
      <>
        <path d={TOOTH} />
        <path d="M10 9.5c-.3 2.5-.6 4.5-1.2 7.5M14 9.5c.3 2.5.6 4.5 1.2 7.5" />
      </>
    ),
    denture: (
      <>
        <path d="M3.5 7c0 7 3.8 12 8.5 12s8.5-5 8.5-12" />
        <path d="M6.6 7.6c0 4.7 2.4 8 5.4 8s5.4-3.3 5.4-8" />
        <path d="M8 13.3l-1.9 1.4M10.6 15.2l-.7 2.4M13.4 15.2l.7 2.4M16 13.3l1.9 1.4" />
      </>
    ),
    implant: (
      <>
        <path d="M7 4.5c0-1 .9-1.5 2-1.5 1.2 0 1.8.7 3 .7s1.8-.7 3-.7c1.1 0 2 .5 2 1.5 0 2-1.2 4-2.2 4.8H9.2C8.2 8.5 7 6.5 7 4.5Z" />
        <path d="M10 9.3v1.5h4V9.3" />
        <path d="M9.6 12.8h4.8M10 15h4M10.4 17.2h3.2M11 19.4h2l-1 1.6Z" />
      </>
    ),
    extract: (
      <>
        <path d="M8 9c-2 0-3.2 1.5-3 3.6.2 2 1 3.3 1.4 5 .4 1.8.5 3.4 1.8 3.4 1.2 0 1.3-2.4 2-3.6.3-.6 1.2-.6 1.6 0 .7 1.2.8 3.6 2 3.6 1.3 0 1.4-1.6 1.8-3.4.4-1.7 1.2-3 1.4-5 .2-2.1-1-3.6-3-3.6-1.3 0-1.8.7-3 .7S9.3 9 8 9Z" />
        <path d="M12 6.4V2.5M9.8 4.4 12 2.2l2.2 2.2" />
      </>
    ),
    clean: (
      <>
        <path d={TOOTH} />
        <path d="M20.6 15.6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5Z" fill="currentColor" stroke="none" />
        <path d="M9 7.2c.4-1 1.1-1.5 2-1.6" />
      </>
    ),
    molar: (
      <>
        <path d="M6 4c-2.2 0-3.3 1.8-3 4.3.3 2.3 1.4 3.6 1.9 5.6.5 2 .6 6.1 2.4 6.1 1.6 0 1.6-3.4 2.3-4.9.3-.6.9-.9 1.4-.9h2c.5 0 1.1.3 1.4.9.7 1.5.7 4.9 2.3 4.9 1.8 0 1.9-4.1 2.4-6.1.5-2 1.6-3.3 1.9-5.6C21.3 5.8 20.2 4 18 4c-1.6 0-2.4.9-3.5.9S12.9 4 12 4s-1.4.9-2.5.9S7.6 4 6 4Z" />
        <path d="M9.5 8.3c.8.5 1.6.8 2.5.8s1.7-.3 2.5-.8" />
      </>
    ),
  }
  return <Svg className={className}>{paths[name]}</Svg>
}

export const WhatsAppIcon = ({ className = 'size-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36A9.42 9.42 0 0 1 2.6 12.05c0-5.2 4.24-9.44 9.45-9.44a9.38 9.38 0 0 1 9.44 9.45c0 5.21-4.24 9.44-9.44 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.05c0 2 .52 3.96 1.52 5.68L.6 23.6l6.02-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.26 0 11.36-5.1 11.36-11.35 0-3.04-1.18-5.89-3.33-8.03" />
  </svg>
)

export const InstagramIcon = ({ className = 'size-5' }) => (
  <Svg className={className} strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" strokeWidth="2.6" />
  </Svg>
)

export const Star = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.8L10 14.6l-5.1 2.8L6 11.6l-4.3-4 5.8-.7Z" />
  </svg>
)

export const Stars = ({ className = 'size-4 text-amber-400' }) => (
  <span className="inline-flex gap-0.5" aria-label="5 de 5 estrellas" role="img">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} className={className} />)}
  </span>
)

/** Destello de cuatro puntas, el adorno de la marca. */
export const Sparkle = ({ className = 'size-5', style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
    <path d="M12 0c.6 5.4 3.3 9.4 12 12-8.7 2.6-11.4 6.6-12 12-.6-5.4-3.3-9.4-12-12C8.7 9.4 11.4 5.4 12 0Z" />
  </svg>
)

export const Pin = ({ className = 'size-5' }) => (
  <Svg className={className} strokeWidth={1.8}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
)

export const Clock = ({ className = 'size-5' }) => (
  <Svg className={className} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
)

export const Arrow = ({ className = 'size-4' }) => (
  <Svg className={className} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const Heart = ({ className = 'size-5' }) => (
  <Svg className={className} strokeWidth={1.8}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />
  </Svg>
)

export const Chat = ({ className = 'size-5' }) => (
  <Svg className={className} strokeWidth={1.8}>
    <path d="M4 5.5h16v10H9l-5 4v-14Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </Svg>
)
