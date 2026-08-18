/* ============================================================
   Avatars — vectoriels originaux.
   Registre voulu : embleme grave, pas mascotte de dessin anime.
   Traits fins, yeux en amande, palette sourde, aucun reflet
   rond facon autocollant.
   ============================================================ */

export type Eyes = 'open' | 'half' | 'closed' | 'happy'

type AvatarProps = {
  size?: number
  eyes?: Eyes
  className?: string
  style?: React.CSSProperties
}

const VB = '0 0 120 140'

/* --- Oeil de chat : amande, paupiere lourde optionnelle -------- */

function CatEye({
  cx,
  cy,
  mode,
  iris,
  ink,
  lid,
}: {
  cx: number
  cy: number
  mode: Eyes
  iris: string
  ink: string
  lid: string
}) {
  if (mode === 'closed') {
    return (
      <path
        d={`M${cx - 7.5} ${cy - 1} q7.5 5.5 15 0`}
        fill="none"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    )
  }
  if (mode === 'happy') {
    return (
      <path
        d={`M${cx - 7.5} ${cy + 2} q7.5 -6.5 15 0`}
        fill="none"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    )
  }
  const almond = `M${cx - 7.5} ${cy} C ${cx - 4.5} ${cy - 6}, ${cx + 4.5} ${cy - 6}, ${cx + 7.5} ${cy} C ${cx + 4.5} ${cy + 5.5}, ${cx - 4.5} ${cy + 5.5}, ${cx - 7.5} ${cy} Z`
  return (
    <g>
      <path d={almond} fill={iris} />
      {mode === 'half' && (
        <path
          d={`M${cx - 7.5} ${cy} C ${cx - 4.5} ${cy - 5}, ${cx + 4.5} ${cy - 5}, ${cx + 7.5} ${cy} C ${cx + 4} ${cy - 2.2}, ${cx - 4} ${cy - 2.2}, ${cx - 7.5} ${cy} Z`}
          fill={lid}
        />
      )}
      <ellipse cx={cx} cy={cy + (mode === 'half' ? 1 : 0)} rx="1.6" ry={mode === 'half' ? 3 : 4} fill={ink} />
    </g>
  )
}

/* ============================================================
   CHAT // SYLVIE
   Chat adulte, calme, solide, fiable. Navy profond, accents
   bleu et orange. Aucun cliche "feminisant".
   ============================================================ */

export function Chat({ size = 120, eyes = 'half', className, style }: AvatarProps) {
  const body = '#212B42'
  const bodyLight = '#26314A'
  const bodyMid = '#28334D'
  const ink = '#0B1020'
  return (
    <svg
      width={size}
      height={(size * 140) / 120}
      viewBox={VB}
      className={className}
      style={style}
      role="img"
      aria-label="Chat"
    >
      <path
        d="M86 130 C 108 128, 114 106, 100 96"
        fill="none"
        stroke="#141B2B"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M34 136 C 34 98, 42 76, 60 76 C 78 76, 86 98, 86 136 Z" fill={body} />
      <path d="M49 136 C 49 110, 53 94, 60 94 C 67 94, 71 110, 71 136 Z" fill={bodyMid} />
      <rect x="36" y="128" width="20" height="8" rx="4" fill={bodyMid} />
      <rect x="64" y="128" width="20" height="8" rx="4" fill={bodyMid} />
      {/* collier fin — accent signature, jamais un noeud ni un pendentif */}
      <path d="M45 80 C 51 87, 69 87, 75 80" fill="none" stroke="#E0521F" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M35 44 L 30 14 L 53 30 Z" fill={body} />
      <path d="M85 44 L 90 14 L 67 30 Z" fill={body} />
      <path d="M37 41 L 34 22 L 48 31 Z" fill="#3478F6" opacity="0.4" />
      <path d="M83 41 L 86 22 L 72 31 Z" fill="#3478F6" opacity="0.4" />
      <path
        d="M60 28 C 77 28, 89 39, 90 52 C 91 65, 81 75, 68 78
           C 65 79, 62 80, 60 80 C 58 80, 55 79, 52 78
           C 39 75, 29 65, 30 52 C 31 39, 43 28, 60 28 Z"
        fill={body}
      />
      <path d="M60 28 C 77 28, 89 39, 90 52 L 30 52 C 31 39, 43 28, 60 28 Z" fill={bodyLight} />
      <CatEye cx={47.5} cy={53} mode={eyes} iris="#55D6E8" ink={ink} lid={bodyLight} />
      <CatEye cx={72.5} cy={53} mode={eyes} iris="#55D6E8" ink={ink} lid={bodyLight} />
      <path d="M57 65 l3 -3 l3 3 l-3 3 z" fill="#E0603A" />
      <path d="M60 68 q-4 4 -7 1.5 M60 68 q4 4 7 1.5" fill="none" stroke="#101728" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M42 64 L 24 61 M42 68 L 25 69 M78 64 L 96 61 M78 68 L 95 69"
        stroke="#8E97A6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

/* ============================================================
   SOURIS // BENEDICTE
   Vive, curieuse, un peu chaotique. Corail sourd, off-white.
   ============================================================ */

export function Souris({ size = 100, eyes = 'open', className, style }: AvatarProps) {
  const body = '#D93A45'
  const bodyDark = '#B32C39'
  const cream = '#EFE9E0'
  const ink = '#101728'
  const closedish = eyes === 'closed' || eyes === 'happy'
  return (
    <svg
      width={size}
      height={(size * 140) / 120}
      viewBox={VB}
      className={className}
      style={style}
      role="img"
      aria-label="Souris"
    >
      <path
        d="M82 128 C 106 128, 114 108, 102 102 C 96 99, 93 107, 99 109"
        fill="none"
        stroke={bodyDark}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M37 136 C 37 108, 45 92, 60 92 C 75 92, 83 108, 83 136 Z" fill={body} />
      <path d="M50 136 C 50 118, 55 106, 60 106 C 65 106, 70 118, 70 136 Z" fill={cream} />
      <rect x="40" y="128" width="18" height="8" rx="4" fill={cream} />
      <rect x="62" y="128" width="18" height="8" rx="4" fill={cream} />
      <circle cx="35" cy="108" r="5.5" fill={bodyDark} />
      <circle cx="85" cy="108" r="5.5" fill={bodyDark} />
      <circle cx="33" cy="33" r="15" fill={body} />
      <circle cx="87" cy="33" r="15" fill={body} />
      <circle cx="33" cy="34" r="8.5" fill="#E9CFC6" />
      <circle cx="87" cy="34" r="8.5" fill="#E9CFC6" />
      <path
        d="M60 28 C 77 28, 89 42, 89 57 C 89 70, 81 79, 71 86
           C 66.5 89, 63.5 92, 60 92 C 56.5 92, 53.5 89, 49 86
           C 39 79, 31 70, 31 57 C 31 42, 43 28, 60 28 Z"
        fill={body}
      />
      <path
        d="M60 92 C 56.5 92, 53.5 89, 49 86 C 46 84, 44 81, 43 78
           C 49 74.5, 71 74.5, 76 78.5 C 75 81, 73.5 84, 71 86 C 66.5 89, 63.5 92, 60 92 Z"
        fill={cream}
      />
      {closedish ? (
        <>
          <path
            d={eyes === 'happy' ? 'M42 56 q7 -6.5 14 0' : 'M42 54 q7 5.5 14 0'}
            fill="none"
            stroke={ink}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d={eyes === 'happy' ? 'M64 56 q7 -6.5 14 0' : 'M64 54 q7 5.5 14 0'}
            fill="none"
            stroke={ink}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="M42 55 C 45 48.5, 53 48.5, 56 55 C 53 60.5, 45 60.5, 42 55 Z" fill={ink} />
          <path d="M64 55 C 67 48.5, 75 48.5, 78 55 C 75 60.5, 67 60.5, 64 55 Z" fill={ink} />
          <circle cx="52" cy="52.5" r="1.3" fill="#F5F3EE" opacity="0.8" />
          <circle cx="74" cy="52.5" r="1.3" fill="#F5F3EE" opacity="0.8" />
        </>
      )}
      <ellipse cx="60" cy="83" rx="3.6" ry="2.9" fill={ink} />
      <path d="M60 86 q0 3.5 -4.5 4 M60 86 q0 3.5 4.5 4" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M44 79 L 26 74 M44 83 L 27 85 M76 79 L 94 74 M76 83 L 93 85"
        stroke="#8E97A6"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

/* ============================================================
   PIRATE — chat entierement noir, curieux, un peu filou.
   ============================================================ */

export function Pirate({ size = 80, eyes = 'open', className, style }: AvatarProps) {
  const body = '#101623'
  const bodyLight = '#151D2C'
  const ink = '#03060C'
  return (
    <svg
      width={size}
      height={(size * 140) / 120}
      viewBox={VB}
      className={className}
      style={style}
      role="img"
      aria-label="Pirate"
    >
      <path d="M86 130 C 108 126, 114 104, 99 95" fill="none" stroke="#0A0E18" strokeWidth="9" strokeLinecap="round" />
      <path d="M36 136 C 36 100, 44 80, 60 80 C 76 80, 84 100, 84 136 Z" fill={body} />
      <rect x="38" y="128" width="19" height="8" rx="4" fill="#161E2E" />
      <rect x="63" y="128" width="19" height="8" rx="4" fill="#161E2E" />
      {/* oreille gauche plus dressee : curieux */}
      <path d="M37 46 L 29 16 L 55 32 Z" fill={body} />
      <path d="M85 44 L 93 15 L 67 31 Z" fill={body} />
      <path
        d="M60 32 C 76 32, 88 43, 89 55 C 90 68, 80 77, 68 80
           C 65 81, 62 82, 60 82 C 58 82, 55 81, 52 80
           C 40 77, 30 68, 31 55 C 32 43, 44 32, 60 32 Z"
        fill={body}
      />
      <path d="M60 32 C 76 32, 88 43, 89 55 L 31 55 C 32 43, 44 32, 60 32 Z" fill={bodyLight} />
      <CatEye cx={48.5} cy={55} mode={eyes} iris="#55D6E8" ink={ink} lid={bodyLight} />
      <CatEye cx={71.5} cy={55} mode={eyes} iris="#55D6E8" ink={ink} lid={bodyLight} />
      <path d="M57 67 l3 -3 l3 3 l-3 3 z" fill="#C4373F" />
      <path d="M60 70 q-4 4 -7 1.5 M60 70 q4 4 7 1.5" fill="none" stroke="#2A3448" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ============================================================
   PEEWEE — chatte grise et blanche, plus posee.
   ============================================================ */

export function PeeWee({ size = 80, eyes = 'half', className, style }: AvatarProps) {
  const grey = '#78838F'
  const white = '#E4E1DA'
  const ink = '#141B28'
  return (
    <svg
      width={size}
      height={(size * 140) / 120}
      viewBox={VB}
      className={className}
      style={style}
      role="img"
      aria-label="PeeWee"
    >
      <path d="M86 130 C 108 126, 114 106, 100 97" fill="none" stroke="#5D6875" strokeWidth="9" strokeLinecap="round" />
      <path d="M36 136 C 36 100, 44 80, 60 80 C 76 80, 84 100, 84 136 Z" fill={grey} />
      <path d="M50 136 C 50 112, 55 98, 60 98 C 65 98, 70 112, 70 136 Z" fill={white} />
      <rect x="38" y="128" width="19" height="8" rx="4" fill={white} />
      <rect x="63" y="128" width="19" height="8" rx="4" fill={white} />
      <path d="M35 46 L 30 16 L 54 32 Z" fill={grey} />
      <path d="M85 46 L 90 16 L 66 32 Z" fill={grey} />
      <path d="M37 43 L 34 25 L 48 33 Z" fill="#C79A9A" opacity="0.45" />
      <path d="M83 43 L 86 25 L 72 33 Z" fill="#C79A9A" opacity="0.45" />
      <path
        d="M60 32 C 76 32, 88 43, 89 55 C 90 68, 80 77, 68 80
           C 65 81, 62 82, 60 82 C 58 82, 55 81, 52 80
           C 40 77, 30 68, 31 55 C 32 43, 44 32, 60 32 Z"
        fill={grey}
      />
      <path
        d="M60 82 C 58 82, 55 81, 52 80 C 47 78, 43 74, 41 70 C 47 65, 73 65, 79 70 C 77 74, 73 78, 68 80 C 65 81, 62 82, 60 82 Z"
        fill={white}
      />
      <CatEye cx={48.5} cy={54} mode={eyes} iris="#3478F6" ink={ink} lid={grey} />
      <CatEye cx={71.5} cy={54} mode={eyes} iris="#3478F6" ink={ink} lid={grey} />
      <path d="M57 69 l3 -3 l3 3 l-3 3 z" fill="#C4373F" />
      <path d="M60 72 q-4 4 -7 1.5 M60 72 q4 4 7 1.5" fill="none" stroke="#3A4453" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* Duo cote a cote — utilise dans plusieurs scenes. */
export function Duo({
  size = 96,
  eyesChat = 'half',
  eyesSouris = 'open',
  gap = -10,
}: {
  size?: number
  eyesChat?: Eyes
  eyesSouris?: Eyes
  gap?: number
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap, justifyContent: 'center' }}>
      <Chat size={size} eyes={eyesChat} />
      <Souris size={size * 0.82} eyes={eyesSouris} />
    </div>
  )
}
