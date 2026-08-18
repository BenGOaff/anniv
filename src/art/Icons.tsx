/* Pictos originaux — traits simples, palette imposee. */

type P = { size?: number; color?: string }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 32 32',
  fill: 'none' as const,
  'aria-hidden': true as const,
})

export function IconLunch({ size = 32, color = '#FF5A24' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="8.5" />
      <circle cx="16" cy="16" r="4.5" opacity="0.5" />
      <path d="M3 4v7a2.5 2.5 0 0 0 2.5 2.5v14" />
      <path d="M5.5 4v7" />
      <path d="M28 4c-2 1.6-3 3.6-3 6s1 3.6 3 4v13.5" />
    </svg>
  )
}

export function IconCocktail({ size = 32, color = '#E63E48' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7h22L16 19 5 7z" />
      <path d="M16 19v8M11 27h10" />
      <circle cx="23" cy="6" r="2" fill={color} stroke="none" />
    </svg>
  )
}

export function IconSpa({ size = 32, color = '#55D6E8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 27c0-7 4-12 10-13-1 8-4 12-10 13z" />
      <path d="M16 27C16 20 12 15 6 14c1 8 4 12 10 13z" />
      <path d="M16 27v-6" />
    </svg>
  )
}

export function IconPool({ size = 32, color = '#3478F6' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2 2.5 2 4 2" />
      <path d="M3 27c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2 2.5 2 4 2" />
      <path d="M11 22V6a3 3 0 0 1 6 0M21 22V6" />
      <path d="M11 12h6M11 17h6" />
    </svg>
  )
}

export function IconHammam({ size = 32, color = '#55D6E8' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20c-3-3-3-6 0-9s3-6 0-8" />
      <path d="M16 20c-3-3-3-6 0-9s3-6 0-8" />
      <path d="M22 20c-3-3-3-6 0-9s3-6 0-8" />
      <path d="M6 25h20M8 29h16" />
    </svg>
  )
}

export function IconWhirlpool({ size = 32, color = '#3478F6' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18h24v4a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-4z" />
      <circle cx="11" cy="11" r="3" />
      <circle cx="19" cy="8" r="2.2" />
      <circle cx="24" cy="13" r="1.6" />
    </svg>
  )
}

export function IconSauna({ size = 32, color = '#FF5A24' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V7a3 3 0 0 1 6 0v12a5 5 0 1 1-6 0z" />
      <circle cx="15" cy="23" r="2.4" fill={color} stroke="none" />
      <path d="M23 8c-2 2-2 4 0 6M27 6c-2 3-2 5 0 8" />
    </svg>
  )
}

export function IconMassage({ size = 32, color = '#E63E48' }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 26v-8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
      <path d="M10 14V9a4 4 0 0 1 8 0v5" />
      <path d="M22 20h3M6 20H3" />
      <path d="M12 26v3M20 26v3" />
    </svg>
  )
}

export const bonusIcons: Record<string, (p: P) => JSX.Element> = {
  lunch: IconLunch,
  cocktail: IconCocktail,
  spa: IconSpa,
  pool: IconPool,
  hammam: IconHammam,
  whirlpool: IconWhirlpool,
  sauna: IconSauna,
  massage: IconMassage,
}

/* --- Symboles du puzzle final --- */

export function SymMessage({ size = 40, color = '#3478F6' }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinejoin="round">
      <path d="M4 7h24v15H14l-7 5v-5H4V7z" />
      <path d="M10 13h12M10 17h8" strokeLinecap="round" />
    </svg>
  )
}

export function SymFerry({ size = 40, color = '#FF5A24' }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinejoin="round">
      <path d="M4 20h24l-3 6H7l-3-6z" />
      <path d="M7 20v-6h18v6" />
      <path d="M13 14V9h6v5" />
      <path d="M2 29c2 0 2 1.6 4 1.6S10 29 12 29s2 1.6 4 1.6S20 29 22 29s2 1.6 4 1.6" strokeLinecap="round" />
    </svg>
  )
}

export function SymHome({ size = 40, color = '#55D6E8' }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinejoin="round">
      <path d="M4 15L16 5l12 10" />
      <path d="M7 13v14h18V13" />
      <path d="M13 27v-8h6v8" />
    </svg>
  )
}

export function SymRing({ size = 40, color = '#E63E48' }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinejoin="round">
      <circle cx="16" cy="21" r="8" />
      <path d="M11 11l5-7 5 7" />
      <path d="M11 11h10" />
    </svg>
  )
}

export const puzzleIcons: Record<string, (p: P) => JSX.Element> = {
  message: SymMessage,
  ferry: SymFerry,
  home: SymHome,
  ring: SymRing,
}
