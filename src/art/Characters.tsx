/* ============================================================
   Avatars — vectoriels originaux.
   Aucun asset externe, aucune reference a une oeuvre protegee.
   Lecture voulue : silhouettes simples, identifiables a 40 px.
   ============================================================ */

export type Eyes = 'open' | 'half' | 'closed' | 'happy'

type AvatarProps = {
  size?: number
  eyes?: Eyes
  className?: string
  style?: React.CSSProperties
}

const VB = '0 0 120 140'

/* --- Yeux partages ------------------------------------------------ */

function CatEye({
  cx,
  cy,
  mode,
  iris,
  ink,
}: {
  cx: number
  cy: number
  mode: Eyes
  iris: string
  ink: string
}) {
  if (mode === 'closed') {
    return (
      <path
        d={`M${cx - 8} ${cy} q8 6 16 0`}
        fill="none"
        stroke={ink}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    )
  }
  if (mode === 'happy') {
    return (
      <path
        d={`M${cx - 8} ${cy + 2} q8 -8 16 0`}
        fill="none"
        stroke={ink}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    )
  }
  if (mode === 'half') {
    /* Demi-disque bas = paupiere lourde. Regard calme, un peu blase. */
    return (
      <g>
        <path d={`M${cx - 8} ${cy} a8 8 0 0 0 16 0 z`} fill={iris} />
        <ellipse cx={cx} cy={cy + 2.6} rx="2.4" ry="3.4" fill={ink} />
        <path
          d={`M${cx - 9} ${cy - 1} q9 -5 18 0`}
          fill="none"
          stroke={ink}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
    )
  }
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="8" ry="8.6" fill={iris} />
      <ellipse cx={cx} cy={cy} rx="2.8" ry="5.4" fill={ink} />
      <circle cx={cx + 3} cy={cy - 3.6} r="1.9" fill="#F5F3EE" opacity="0.9" />
    </g>
  )
}

/* ============================================================
   CHAT // SYLVIE
   Chat adulte, calme, solide, fiable. Navy/noir, accents bleu + orange.
   Aucun cliche "feminisant" : pas de rose, pas de cils, pas de noeud.
   ============================================================ */

export function Chat({ size = 120, eyes = 'half', className, style }: AvatarProps) {
  const body = '#1B2438'
  const bodyDark = '#111827'
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
      {/* queue */}
      <path
        d="M94 126 C 118 124, 124 98, 105 88"
        fill="none"
        stroke={bodyDark}
        strokeWidth="13"
        strokeLinecap="round"
      />
      {/* corps */}
      <path d="M24 134 C 24 98, 36 78, 60 78 C 84 78, 96 98, 96 134 Z" fill={body} />
      {/* poitrail */}
      <path d="M46 134 C 46 112, 52 100, 60 100 C 68 100, 74 112, 74 134 Z" fill="#232E47" />
      {/* pattes */}
      <ellipse cx="41" cy="130" rx="12" ry="7" fill="#232E47" />
      <ellipse cx="79" cy="130" rx="12" ry="7" fill="#232E47" />
      <path d="M35 130 v-4 M41 130 v-4 M47 130 v-4" stroke={ink} strokeWidth="1.4" opacity="0.5" />
      <path d="M73 130 v-4 M79 130 v-4 M85 130 v-4" stroke={ink} strokeWidth="1.4" opacity="0.5" />
      {/* bandana orange — accent signature */}
      <path d="M38 82 C 46 92, 74 92, 82 82 L 84 76 C 74 86, 46 86, 36 76 Z" fill="#FF5A24" />
      <path d="M60 90 l6 10 l-6 3 l-6 -3 z" fill="#FF5A24" />
      {/* oreilles */}
      <path d="M30 40 L 24 8 L 54 26 Z" fill={body} />
      <path d="M90 40 L 96 8 L 66 26 Z" fill={body} />
      <path d="M33 37 L 30 17 L 47 27 Z" fill="#3478F6" opacity="0.55" />
      <path d="M87 37 L 90 17 L 73 27 Z" fill="#3478F6" opacity="0.55" />
      {/* tete */}
      <ellipse cx="60" cy="52" rx="35" ry="30" fill={body} />
      <path d="M25 52 a35 30 0 0 1 70 0 z" fill="#212C44" opacity="0.55" />
      {/* yeux */}
      <CatEye cx={45} cy={50} mode={eyes} iris="#55D6E8" ink={ink} />
      <CatEye cx={75} cy={50} mode={eyes} iris="#55D6E8" ink={ink} />
      {/* museau */}
      <path d="M56 63 l4 -4 l4 4 l-4 4 z" fill="#FF5A24" />
      <path d="M60 67 q-5 6 -10 2 M60 67 q5 6 10 2" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      {/* moustaches */}
      <path
        d="M40 62 L 20 58 M40 66 L 21 66 M80 62 L 100 58 M80 66 L 99 66"
        stroke="#A9B1BD"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

/* ============================================================
   SOURIS // BENEDICTE
   Petite souris energique, curieuse, un peu chaotique.
   Corail/rouge, touches off-white.
   ============================================================ */

export function Souris({ size = 100, eyes = 'open', className, style }: AvatarProps) {
  const body = '#E63E48'
  const bodyDark = '#C3313E'
  const cream = '#F5F3EE'
  const ink = '#0B1020'
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
      {/* queue fine, enroulee au bout */}
      <path
        d="M82 126 C 108 128, 118 106, 105 100 C 98 97, 95 106, 101 108"
        fill="none"
        stroke={bodyDark}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* corps */}
      <path d="M32 134 C 32 106, 42 90, 60 90 C 78 90, 88 106, 88 134 Z" fill={body} />
      <path d="M46 134 C 46 118, 52 108, 60 108 C 68 108, 74 118, 74 134 Z" fill={cream} />
      <ellipse cx="44" cy="132" rx="10" ry="5.5" fill={cream} />
      <ellipse cx="76" cy="132" rx="10" ry="5.5" fill={cream} />
      {/* petites mains expressives */}
      <circle cx="31" cy="108" r="7" fill={bodyDark} />
      <circle cx="89" cy="108" r="7" fill={bodyDark} />
      {/* grandes oreilles rondes */}
      <circle cx="29" cy="30" r="18" fill={body} />
      <circle cx="91" cy="30" r="18" fill={body} />
      <circle cx="29" cy="31" r="10.5" fill={cream} opacity="0.9" />
      <circle cx="91" cy="31" r="10.5" fill={cream} opacity="0.9" />
      {/* tete : large en haut, museau pointu vers le bas */}
      <path
        d="M60 26 C 79 26, 92 41, 92 57 C 92 71, 83 80, 72 87
           C 67 90, 64 93, 60 93 C 56 93, 53 90, 48 87
           C 37 80, 28 71, 28 57 C 28 41, 41 26, 60 26 Z"
        fill={body}
      />
      {/* museau clair */}
      <path
        d="M60 93 C 56 93, 53 90, 48 87 C 44.5 84.5, 42 81, 41 77.5
           C 47 72, 73 72, 79 77.5 C 78 81, 75.5 84.5, 72 87 C 67 90, 64 93, 60 93 Z"
        fill={cream}
      />
      {/* yeux */}
      {eyes === 'closed' || eyes === 'happy' ? (
        <>
          <path
            d={eyes === 'happy' ? 'M39 55 q7 -8 14 0' : 'M39 54 q7 6 14 0'}
            fill="none"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d={eyes === 'happy' ? 'M67 55 q7 -8 14 0' : 'M67 54 q7 6 14 0'}
            fill="none"
            stroke={ink}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="46" cy="54" r="7" fill={ink} />
          <circle cx="74" cy="54" r="7" fill={ink} />
          <circle cx="48.4" cy="51.4" r="2.4" fill={cream} />
          <circle cx="76.4" cy="51.4" r="2.4" fill={cream} />
        </>
      )}
      {/* nez + sourire */}
      <ellipse cx="60" cy="83" rx="4.2" ry="3.4" fill={ink} />
      <path
        d="M60 86.5 q0 4 -5 4.5 M60 86.5 q0 4 5 4.5"
        fill="none"
        stroke={ink}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* moustaches */}
      <path
        d="M42 79 L 22 73 M42 83 L 23 85 M78 79 L 98 73 M78 83 L 97 85"
        stroke="#A9B1BD"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  )
}

/* ============================================================
   PIRATE — chat entierement noir, curieux, un peu filou.
   ============================================================ */

export function Pirate({ size = 80, eyes = 'open', className, style }: AvatarProps) {
  const body = '#0E1421'
  const ink = '#000000'
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
      <path
        d="M92 126 C 116 122, 122 96, 102 88"
        fill="none"
        stroke={body}
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path d="M28 134 C 28 102, 40 84, 60 84 C 80 84, 92 102, 92 134 Z" fill={body} />
      <ellipse cx="43" cy="131" rx="11" ry="6" fill="#151D2E" />
      <ellipse cx="77" cy="131" rx="11" ry="6" fill="#151D2E" />
      {/* oreille droite legerement inclinee : curieux */}
      <path d="M32 42 L 26 12 L 55 28 Z" fill={body} />
      <path d="M90 40 L 100 12 L 68 26 Z" fill={body} />
      <ellipse cx="60" cy="56" rx="32" ry="27" fill={body} />
      <ellipse cx="60" cy="42" rx="32" ry="14" fill="#182134" opacity="0.5" />
      <CatEye cx={47} cy={54} mode={eyes} iris="#55D6E8" ink={ink} />
      <CatEye cx={73} cy={54} mode={eyes} iris="#55D6E8" ink={ink} />
      <path d="M56 66 l4 -3.5 l4 3.5 l-4 3.5 z" fill="#E63E48" />
      <path d="M60 70 q-4 5 -8 2 M60 70 q4 5 8 2" fill="none" stroke="#2A3450" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M42 64 L 24 60 M42 68 L 25 69 M78 64 L 96 60 M78 68 L 95 69"
        stroke="#4A5468"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ============================================================
   PEEWEE — chatte grise et blanche, plus posee.
   ============================================================ */

export function PeeWee({ size = 80, eyes = 'half', className, style }: AvatarProps) {
  const grey = '#7C8798'
  const greyDark = '#68737F'
  const white = '#EFEDE8'
  const ink = '#1B2434'
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
      <path
        d="M92 126 C 116 122, 122 98, 103 90"
        fill="none"
        stroke={greyDark}
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path d="M28 134 C 28 102, 40 84, 60 84 C 80 84, 92 102, 92 134 Z" fill={grey} />
      {/* poitrail et pattes blanches */}
      <path d="M47 134 C 47 114, 53 104, 60 104 C 67 104, 73 114, 73 134 Z" fill={white} />
      <ellipse cx="43" cy="131" rx="11" ry="6" fill={white} />
      <ellipse cx="77" cy="131" rx="11" ry="6" fill={white} />
      <path d="M30 42 L 25 12 L 54 28 Z" fill={grey} />
      <path d="M90 42 L 95 12 L 66 28 Z" fill={grey} />
      <path d="M33 39 L 30 20 L 46 29 Z" fill="#E9B7B7" opacity="0.5" />
      <path d="M87 39 L 90 20 L 74 29 Z" fill="#E9B7B7" opacity="0.5" />
      <ellipse cx="60" cy="56" rx="32" ry="27" fill={grey} />
      {/* masque blanc du museau */}
      <ellipse cx="60" cy="66" rx="20" ry="15" fill={white} />
      <CatEye cx={47} cy={52} mode={eyes} iris="#3478F6" ink={ink} />
      <CatEye cx={73} cy={52} mode={eyes} iris="#3478F6" ink={ink} />
      <path d="M56 65 l4 -3.5 l4 3.5 l-4 3.5 z" fill="#E63E48" />
      <path d="M60 69 q-4 5 -8 2 M60 69 q4 5 8 2" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M42 66 L 24 62 M42 70 L 25 71 M78 66 L 96 62 M78 70 L 95 71"
        stroke="#9AA3B0"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
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
