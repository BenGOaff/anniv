/* ============================================================
   Decors — SVG originaux, plein cadre.
   Paysages illustres/stylises, jamais photorealistes.
   ============================================================ */

import { memo, type ReactNode } from 'react'

const W = 375
const H = 812

export function Backdrop({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      className={`backdrop ${className ?? ''}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={style}
    >
      {children}
    </svg>
  )
}

/* --- Lignes topographiques : signature graphique recurrente -------- */

export const TopoLines = memo(function TopoLines({ opacity = 0.16, stroke = '#3478F6' }: { opacity?: number; stroke?: string }) {
  const rings = [0, 1, 2, 3, 4, 5, 6]
  return (
    <g opacity={opacity} fill="none" stroke={stroke} strokeWidth="1">
      {rings.map((i) => (
        <path
          key={i}
          d={`M-40 ${180 + i * 62}
              C 60 ${140 + i * 62}, 120 ${240 + i * 60}, 200 ${196 + i * 62}
              C 280 ${152 + i * 62}, 330 ${238 + i * 60}, 420 ${200 + i * 62}`}
        />
      ))}
    </g>
  )
})

/* --- Marques de coordonnees --------------------------------------- */

export const CoordTicks = memo(function CoordTicks({ y = 120, color = '#A9B1BD' }: { y?: number; color?: string }) {
  const ticks = Array.from({ length: 16 }, (_, i) => i)
  return (
    <g opacity="0.35" stroke={color}>
      <line x1="0" y1={y} x2={W} y2={y} strokeWidth="0.8" strokeDasharray="2 6" />
      {ticks.map((i) => (
        <line key={i} x1={i * 25} y1={y - 3} x2={i * 25} y2={y + 3} strokeWidth="0.8" />
      ))}
    </g>
  )
})

/* ============================================================
   SEASCAPE — base mediterraneenne parametrable.
   Sert a Calanques, Bonifacio, Propriano, Carnon, Camargue.
   ============================================================ */

type SeascapeProps = {
  id: string
  skyTop: string
  skyBottom: string
  seaTop: string
  seaBottom: string
  /* Soleil en props primitives : les composants restent memoisables. */
  sunX?: number
  sunY?: number
  sunR?: number
  sunColor?: string
  horizon?: number
  farColor?: string
  midColor?: string
  nearColor?: string
  shape?: 'calanques' | 'bonifacio' | 'open' | 'lagoon'
  stars?: boolean
}

export const Seascape = memo(function Seascape({
  id,
  skyTop,
  skyBottom,
  seaTop,
  seaBottom,
  sunX,
  sunY,
  sunR = 26,
  sunColor = '#FFB07A',
  horizon = 470,
  farColor = '#1B2740',
  midColor = '#141D30',
  nearColor = '#0D1424',
  shape = 'open',
  stars = false,
}: SeascapeProps) {
  const sun = sunX !== undefined && sunY !== undefined ? { x: sunX, y: sunY, r: sunR, color: sunColor } : null
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={seaTop} />
          <stop offset="100%" stopColor={seaBottom} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor={sun?.color ?? '#FF5A24'} stopOpacity="0.55" />
          <stop offset="100%" stopColor={sun?.color ?? '#FF5A24'} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={W} height={horizon + 2} fill={`url(#${id}-sky)`} />

      {stars && (
        <g fill="#F5F3EE" opacity="0.55">
          {[
            [40, 70],
            [95, 120],
            [150, 55],
            [220, 100],
            [265, 48],
            [318, 132],
            [345, 78],
            [70, 175],
            [190, 160],
            [300, 195],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.6 : 1} />
          ))}
        </g>
      )}

      {sun && (
        <g>
          <circle cx={sun.x} cy={sun.y} r={sun.r * 4} fill={`url(#${id}-glow)`} />
          <circle cx={sun.x} cy={sun.y} r={sun.r} fill={sun.color} opacity="0.9" />
        </g>
      )}

      {/* reliefs lointains */}
      {shape === 'calanques' && (
        <>
          <path
            d={`M-10 ${horizon} L 40 ${horizon - 96} L 92 ${horizon - 40} L 140 ${horizon - 120} L 196 ${horizon - 34} L 250 ${horizon - 86} L 310 ${horizon - 26} L 385 ${horizon - 70} L 385 ${horizon} Z`}
            fill={farColor}
          />
          <path
            d={`M-10 ${horizon + 2} L 30 ${horizon - 46} L 80 ${horizon - 8} L 128 ${horizon - 62} L 178 ${horizon - 6} L 236 ${horizon - 44} L 300 ${horizon - 4} L 385 ${horizon - 36} L 385 ${horizon + 2} Z`}
            fill={midColor}
          />
        </>
      )}

      {shape === 'bonifacio' && (
        <>
          {/* falaise calcaire massive a gauche, mer ouverte a droite */}
          <path
            d={`M-10 ${horizon} L -10 ${horizon - 210} L 90 ${horizon - 232} L 150 ${horizon - 186} L 168 ${horizon - 60} L 176 ${horizon} Z`}
            fill={farColor}
          />
          <path
            d={`M-10 ${horizon} L -10 ${horizon - 150} L 60 ${horizon - 162} L 118 ${horizon - 120} L 132 ${horizon} Z`}
            fill={midColor}
          />
          <path
            d={`M250 ${horizon} L 268 ${horizon - 54} L 310 ${horizon - 22} L 340 ${horizon - 62} L 385 ${horizon - 30} L 385 ${horizon} Z`}
            fill={farColor}
          />
        </>
      )}

      {shape === 'lagoon' && (
        <path
          d={`M-10 ${horizon} L -10 ${horizon - 18} C 90 ${horizon - 30}, 180 ${horizon - 8}, 260 ${horizon - 22} C 320 ${horizon - 32}, 350 ${horizon - 12}, 385 ${horizon - 20} L 385 ${horizon} Z`}
          fill={farColor}
        />
      )}

      {shape === 'open' && (
        <path
          d={`M-10 ${horizon} L -10 ${horizon - 26} L 78 ${horizon - 44} L 150 ${horizon - 18} L 240 ${horizon - 38} L 330 ${horizon - 14} L 385 ${horizon - 28} L 385 ${horizon} Z`}
          fill={farColor}
          opacity="0.9"
        />
      )}

      {/* mer */}
      <rect x="0" y={horizon} width={W} height={H - horizon} fill={`url(#${id}-sea)`} />

      {/* reflet du soleil */}
      {sun && (
        <g opacity="0.4" stroke={sun.color} strokeLinecap="round">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={i}
              x1={sun.x - (10 + i * 7)}
              y1={horizon + 14 + i * 22}
              x2={sun.x + (10 + i * 7)}
              y2={horizon + 14 + i * 22}
              strokeWidth={2.4 - i * 0.2}
              opacity={1 - i * 0.11}
            />
          ))}
        </g>
      )}

      {/* houle */}
      <g opacity="0.3" stroke="#F5F3EE" fill="none" strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const y = horizon + 34 + i * 42
          return (
            <path
              key={i}
              d={`M${-20 + (i % 2) * 40} ${y} q 22 -6 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0`}
              strokeWidth={0.9 + i * 0.18}
              opacity={0.35 + i * 0.07}
            />
          )
        })}
      </g>

      {/* premier plan */}
      <path
        d={`M-10 ${H} L -10 ${H - 90} C 60 ${H - 130}, 130 ${H - 60}, 200 ${H - 96} C 270 ${H - 132}, 330 ${H - 66}, 385 ${H - 104} L 385 ${H} Z`}
        fill={nearColor}
        opacity="0.85"
      />
    </>
  )
})

/* ============================================================
   CARTE MEDITERRANEENNE stylisee — boot, long distance, finale.
   Trace libre : evocation, pas geographie exacte.
   ============================================================ */

export const MedMap = memo(function MedMap({ id = 'med', tint = '#1B2740' }: { id?: string; tint?: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E1526" />
          <stop offset="100%" stopColor="#0A101E" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={`url(#${id}-bg)`} />
      <TopoLines opacity={0.1} />

      {/* grille de carte */}
      <g opacity="0.12" stroke="#A9B1BD" strokeWidth="0.6">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 47} y1="0" x2={i * 47} y2={H} />
        ))}
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 47} x2={W} y2={i * 47} />
        ))}
      </g>

      {/* continent (sud de la France, evocation) */}
      <path
        d="M-20 300 C 40 292, 110 306, 168 300 C 214 296, 250 312, 300 306 C 340 302, 370 316, 400 310 L 400 -20 L -20 -20 Z"
        fill={tint}
        opacity="0.85"
      />
      <path
        d="M-20 300 C 40 292, 110 306, 168 300 C 214 296, 250 312, 300 306 C 340 302, 370 316, 400 310"
        fill="none"
        stroke="#55D6E8"
        strokeWidth="1.4"
        opacity="0.5"
      />

      {/* Corse (evocation) */}
      <path
        d="M262 452 C 250 470, 254 508, 264 540 C 272 566, 292 586, 300 570 C 310 548, 306 500, 296 470 C 290 452, 274 438, 262 452 Z"
        fill={tint}
        opacity="0.9"
      />
      <path
        d="M262 452 C 250 470, 254 508, 264 540 C 272 566, 292 586, 300 570 C 310 548, 306 500, 296 470 C 290 452, 274 438, 262 452 Z"
        fill="none"
        stroke="#55D6E8"
        strokeWidth="1.2"
        opacity="0.55"
      />
    </>
  )
})

/* ============================================================
   TERMINAL MARITIME — Marseille 2014
   ============================================================ */

export const FerryTerminal = memo(function FerryTerminal() {
  return (
    <>
      <defs>
        <linearGradient id="fer-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A4A86" />
          <stop offset="55%" stopColor="#7B6194" />
          <stop offset="100%" stopColor="#E07A4A" />
        </linearGradient>
        <linearGradient id="fer-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3A63" />
          <stop offset="100%" stopColor="#101B30" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height="430" fill="url(#fer-sky)" />
      <circle cx="286" cy="352" r="34" fill="#FF7A45" opacity="0.85" />
      <circle cx="286" cy="352" r="90" fill="#FF5A24" opacity="0.12" />

      {/* skyline portuaire */}
      <g fill="#16203A">
        <rect x="0" y="330" width="46" height="100" />
        <rect x="52" y="356" width="30" height="74" />
        <rect x="88" y="316" width="24" height="114" />
        <rect x="120" y="366" width="42" height="64" />
        <rect x="330" y="342" width="46" height="88" />
      </g>
      {/* grues */}
      <g stroke="#0E1626" strokeWidth="4" fill="none">
        <path d="M172 430 L 172 300 L 236 316" />
        <path d="M172 316 L 140 322" />
        <path d="M300 430 L 300 322 L 348 334" />
      </g>

      {/* mer du bassin */}
      <rect x="0" y="430" width={W} height="140" fill="url(#fer-sea)" />
      <g opacity="0.28" stroke="#F5F3EE" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${-10 + i * 12} ${446 + i * 28} q 24 -5 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0`} strokeWidth="1" />
        ))}
      </g>

      {/* FERRY */}
      <g>
        <path d="M28 430 L 348 430 L 330 470 L 46 470 Z" fill="#F1EFE9" />
        <rect x="60" y="392" width="240" height="38" fill="#E9E6DE" />
        <rect x="60" y="392" width="240" height="10" fill="#E63E48" />
        <g fill="#2B3A57">
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={72 + i * 19} y="408" width="12" height="12" rx="2" />
          ))}
        </g>
        <rect x="196" y="358" width="70" height="36" fill="#F1EFE9" />
        <rect x="228" y="322" width="18" height="38" fill="#FF5A24" />
        <rect x="28" y="430" width="320" height="6" fill="#3478F6" opacity="0.7" />
      </g>

      {/* quai */}
      <rect x="0" y="560" width={W} height={H - 560} fill="#131A2A" />
      <rect x="0" y="560" width={W} height="8" fill="#1D2740" />
      {/* marquage au sol */}
      <g stroke="#FF5A24" strokeWidth="3" opacity="0.5" strokeDasharray="16 18">
        <line x1="0" y1="700" x2={W} y2="700" />
      </g>
      <g stroke="#A9B1BD" strokeWidth="1" opacity="0.2">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1="0" y1={588 + i * 38} x2={W} y2={588 + i * 38} />
        ))}
      </g>
    </>
  )
})

/* ============================================================
   CHAMBRE STYLISEE — Montpellier
   Jamais realiste, jamais medicale au premier degre.
   ============================================================ */

export const StylizedRoom = memo(function StylizedRoom() {
  return (
    <>
      <defs>
        <linearGradient id="room-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16203A" />
          <stop offset="100%" stopColor="#0D1424" />
        </linearGradient>
        <linearGradient id="room-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3478F6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#55D6E8" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#room-bg)" />
      {/* fenetre : lumiere douce */}
      <rect x="42" y="118" width="140" height="180" rx="6" fill="url(#room-win)" />
      <line x1="112" y1="118" x2="112" y2="298" stroke="#0D1424" strokeWidth="4" />
      <line x1="42" y1="208" x2="182" y2="208" stroke="#0D1424" strokeWidth="4" />
      {/* faisceau de lumiere */}
      <path d="M42 298 L 182 298 L 300 640 L 10 640 Z" fill="#55D6E8" opacity="0.05" />
      {/* ligne d'horizon murale */}
      <line x1="0" y1="470" x2={W} y2="470" stroke="#A9B1BD" strokeWidth="1" opacity="0.18" />
      {/* lit suggere par des formes simples */}
      <rect x="46" y="520" width="284" height="16" rx="8" fill="#1F2B45" />
      <rect x="46" y="536" width="284" height="86" rx="10" fill="#233052" />
      <rect x="60" y="498" width="72" height="30" rx="10" fill="#F5F3EE" opacity="0.8" />
      <rect x="56" y="622" width="16" height="52" fill="#1B2438" />
      <rect x="304" y="622" width="16" height="52" fill="#1B2438" />
      {/* moniteur stylise : une seule ligne, discrete */}
      <rect x="258" y="300" width="86" height="58" rx="8" fill="#0F1728" stroke="#2A3A5C" />
      <path
        d="M266 332 h14 l6 -14 l8 26 l7 -18 l6 6 h20"
        fill="none"
        stroke="#55D6E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
})

/* ============================================================
   INTERIEUR CARNON — deux bureaux, grande ouverture sur la mer.
   ============================================================ */

export const CarnonInterior = memo(function CarnonInterior() {
  return (
    <>
      <defs>
        <linearGradient id="car-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2540" />
          <stop offset="100%" stopColor="#101A2E" />
        </linearGradient>
        <linearGradient id="car-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FC6E8" />
          <stop offset="60%" stopColor="#B8DCE4" />
          <stop offset="100%" stopColor="#F0D9C0" />
        </linearGradient>
        <linearGradient id="car-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E9DBF" />
          <stop offset="100%" stopColor="#1F6A93" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#car-wall)" />

      {/* baie vitree */}
      <rect x="26" y="96" width="324" height="330" rx="8" fill="url(#car-sky)" />
      <rect x="26" y="300" width="324" height="126" fill="url(#car-sea)" />
      <g opacity="0.4" stroke="#F5F3EE" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M26 ${322 + i * 26} q 20 -5 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} strokeWidth="1" />
        ))}
      </g>
      <circle cx="272" cy="212" r="26" fill="#FFE3C4" opacity="0.85" />
      {/* menuiserie */}
      <g fill="#0C1322">
        <rect x="26" y="96" width="324" height="8" />
        <rect x="26" y="418" width="324" height="10" />
        <rect x="26" y="96" width="10" height="332" />
        <rect x="340" y="96" width="10" height="332" />
        <rect x="183" y="96" width="10" height="332" />
      </g>
      {/* sol */}
      <rect x="0" y="620" width={W} height={H - 620} fill="#0C1322" />
      <g stroke="#1C2740" strokeWidth="1" opacity="0.7">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1="0" y1={640 + i * 26} x2={W} y2={640 + i * 26} />
        ))}
      </g>
    </>
  )
})

/* ============================================================
   CAMARGUE — eau, roseaux, horizon, calme.
   ============================================================ */

export const CamargueLandscape = memo(function CamargueLandscape() {
  return (
    <>
      <defs>
        <linearGradient id="cam-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B3A63" />
          <stop offset="45%" stopColor="#C96A55" />
          <stop offset="78%" stopColor="#F09A62" />
          <stop offset="100%" stopColor="#FFC49A" />
        </linearGradient>
        <linearGradient id="cam-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2A778" />
          <stop offset="35%" stopColor="#8C7CA0" />
          <stop offset="100%" stopColor="#2C3E63" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height="470" fill="url(#cam-sky)" />
      <circle cx="196" cy="436" r="40" fill="#FFD3AC" opacity="0.9" />
      <circle cx="196" cy="436" r="120" fill="#FF9A5C" opacity="0.16" />

      {/* bande de terre lointaine */}
      <path d="M-10 470 L -10 456 C 80 448, 150 462, 220 454 C 290 446, 340 460, 385 452 L 385 470 Z" fill="#33355E" opacity="0.8" />

      {/* etang */}
      <rect x="0" y="470" width={W} height={H - 470} fill="url(#cam-water)" />
      <g opacity="0.45" stroke="#FFD3AC" fill="none" strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={196 - (14 + i * 12)} y1={484 + i * 26} x2={196 + (14 + i * 12)} y2={484 + i * 26} strokeWidth={2 - i * 0.2} opacity={0.9 - i * 0.13} />
        ))}
      </g>
      <g opacity="0.25" stroke="#F5F3EE" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${-10 + i * 16} ${540 + i * 40} q 26 -5 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0`} strokeWidth="1" />
        ))}
      </g>

      {/* roseaux au premier plan */}
      <g stroke="#141B2E" strokeWidth="3" fill="none" strokeLinecap="round">
        {[
          [14, 812, 22, 640],
          [30, 812, 24, 672],
          [46, 812, 58, 620],
          [62, 812, 54, 688],
          [300, 812, 292, 656],
          [318, 812, 328, 614],
          [336, 812, 330, 686],
          [356, 812, 366, 646],
        ].map(([x1, y1, x2, y2], i) => (
          <path key={i} d={`M${x1} ${y1} Q ${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2} ${x2} ${y2}`} />
        ))}
      </g>
      <g fill="#141B2E">
        {[
          [22, 640],
          [24, 672],
          [58, 620],
          [292, 656],
          [328, 614],
          [366, 646],
        ].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy - 10} rx="4" ry="12" />
        ))}
      </g>
    </>
  )
})
