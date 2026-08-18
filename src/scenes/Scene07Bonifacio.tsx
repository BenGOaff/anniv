import { useEffect, useState } from 'react'
import { Backdrop, Seascape } from '../art/Backdrops'
import { Chat, Souris } from '../art/Characters'
import { Cta, MonoLines, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useDragProgress, usePointerX } from '../hooks/useDrag'
import { useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

type Phase = 'sail' | 'cave' | 'question' | 'yes'

/* Rochers : position laterale (0..1) et avancement (0..1). */
const ROCKS = [
  { x: 0.3, t: 0.22, r: 30 },
  { x: 0.72, t: 0.44, r: 36 },
  { x: 0.36, t: 0.66, r: 28 },
  { x: 0.66, t: 0.85, r: 24 },
]

export function Scene07Bonifacio({ onDone, unlock }: SceneProps) {
  const [phase, setPhase] = useState<Phase>('sail')
  const { t, handlers } = useDragProgress(340, 'y')
  const { x, onPointerMove } = usePointerX(0.5)

  /* Correction douce : les rochers repoussent, ils ne bloquent jamais. */
  let steer = x
  for (const rock of ROCKS) {
    const near = 1 - Math.min(1, Math.abs(rock.t - t) / 0.13)
    if (near <= 0) continue
    const dx = steer - rock.x
    const dist = Math.abs(dx)
    if (dist < 0.19) {
      steer += (dx >= 0 ? 1 : -1) * (0.19 - dist) * near * 1.15
    }
  }
  steer = Math.min(0.92, Math.max(0.08, steer))

  useEffect(() => {
    if (phase === 'sail' && t >= 0.99) {
      setPhase('cave')
      sfx('water')
    }
  }, [t, phase])

  useTimeout(() => setPhase('question'), phase === 'cave' ? 2200 : null)

  const accepted = useStagger(copy.bonifacio.accepted.length, 900, phase === 'yes', 900)

  const sayYes = () => {
    sfx('reveal')
    setPhase('yes')
    unlock('quete-principale')
  }

  if (phase === 'sail') {
    return (
      <SceneShell
        backdrop={
          <Backdrop>
            <Seascape
              id="bon"
              skyTop="#1C4E86"
              skyBottom="#8FD3E8"
              seaTop="#2FBFD4"
              seaBottom="#0F5A78"
              horizon={300}
              shape="bonifacio"
              farColor="#DCD3C2"
              midColor="#C6BBA6"
              nearColor="#0E3A50"
              sunX={300}
            sunY={130}
            sunR={22}
            sunColor="#FFE0BC"
            />
          </Backdrop>
        }
      >
        <div className="stack gap-4">
          <p className="mono-line dim">{copy.bonifacio.header}</p>
          <p className="mono-line warn">{copy.bonifacio.instruction}</p>
        </div>

        <div className="bf-field" {...handlers} onPointerMove={(e) => { handlers.onPointerMove(e); onPointerMove(e) }}>
          {ROCKS.map((rock, i) => (
            <span
              key={i}
              className="bf-rock"
              style={{
                left: `${rock.x * 100}%`,
                bottom: `${8 + rock.t * 46}%`,
                width: rock.r * 2,
                height: rock.r * 1.5,
              }}
            >
              <svg viewBox="0 0 60 44" width="100%" height="100%" aria-hidden="true">
                <path d="M2 42 L 14 12 L 28 2 L 44 14 L 58 42 Z" fill="#E7DECC" />
                <path d="M14 12 L 28 2 L 34 20 L 20 26 Z" fill="#FFFFFF" opacity="0.35" />
                <path d="M2 42 L 58 42 L 54 44 L 6 44 Z" fill="#0F5A78" opacity="0.5" />
              </svg>
            </span>
          ))}

          <span className="bf-goal" style={{ bottom: '66%' }}>
            <span className="bf-goal-mark" />
            <span className="bf-goal-label">{copy.bonifacio.cave}</span>
          </span>

          <span
            className="bf-kayak"
            style={{ left: `${steer * 100}%`, bottom: `${5 + t * 56}%` }}
          >
            <Kayak />
          </span>
        </div>

        <p className="hint">{copy.bonifacio.hint}</p>
      </SceneShell>
    )
  }

  return (
    <SceneShell
      backdrop={
        <Backdrop>
          <CaveBackdrop />
        </Backdrop>
      }
    >
      <p className="mono-line dim">{copy.bonifacio.cave}</p>

      <div className="middle" style={{ width: '100%' }}>
        <div className="bf-propose">
          <Chat size={104} eyes={phase === 'yes' ? 'happy' : 'half'} />
          <span className="bf-kneel">
            <Souris size={84} eyes={phase === 'yes' ? 'happy' : 'open'} />
          </span>
          {(phase === 'question' || phase === 'yes') && (
            <span className="bf-ring">
              <Ring />
            </span>
          )}
        </div>

        {phase === 'question' && <h2 className="headline bf-question anim-in">{copy.bonifacio.question}</h2>}

        {phase === 'yes' && (
          <>
            <div className="bf-particles" aria-hidden="true">
              {Array.from({ length: 26 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    left: `${(i * 37) % 100}%`,
                    animationDelay: `${(i % 9) * 90}ms`,
                    background: ['#E63E48', '#FF5A24', '#55D6E8'][i % 3],
                  }}
                />
              ))}
            </div>
            <div style={{ marginTop: 26 }}>
              <MonoLines lines={copy.bonifacio.accepted} visible={accepted} tone="warn" />
            </div>
          </>
        )}
      </div>

      <div className="stack gap-8">
        {phase === 'question' && (
          <div className="cta-row">
            <Cta small onClick={sayYes}>
              {copy.bonifacio.answers[0]}
            </Cta>
            <Cta small variant="blue" onClick={sayYes}>
              {copy.bonifacio.answers[1]}
            </Cta>
          </div>
        )}
        {phase === 'yes' && accepted >= copy.bonifacio.accepted.length && (
          <Cta onClick={onDone}>{copy.ui.continue}</Cta>
        )}
      </div>
    </SceneShell>
  )
}

function Kayak() {
  return (
    <svg width="70" height="42" viewBox="0 0 70 42" fill="none" aria-hidden="true">
      <ellipse cx="35" cy="34" rx="30" ry="6" fill="#0F5A78" opacity="0.45" />
      <path d="M4 26 C 12 16, 58 16, 66 26 C 58 34, 12 34, 4 26 Z" fill="#FF5A24" />
      <path d="M12 25 C 20 20, 50 20, 58 25 C 50 29, 20 29, 12 25 Z" fill="#131A2A" opacity="0.55" />
      <rect x="30" y="6" width="10" height="4" rx="2" fill="#F5F3EE" />
      <path d="M16 12 L 54 20" stroke="#F5F3EE" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <circle cx="28" cy="18" r="5" fill="#1B2438" />
      <circle cx="43" cy="18" r="4.4" fill="#E63E48" />
    </svg>
  )
}

function Ring() {
  return (
    <svg width="46" height="52" viewBox="0 0 46 52" fill="none" aria-hidden="true">
      <circle cx="23" cy="32" r="14" fill="none" stroke="#F5F3EE" strokeWidth="4" />
      <path d="M16 20 L 23 8 L 30 20 Z" fill="#55D6E8" />
      <path d="M16 20 L 30 20 L 23 26 Z" fill="#3478F6" />
    </svg>
  )
}

function CaveBackdrop() {
  return (
    <>
      <defs>
        <radialGradient id="cv-light" cx="50%" cy="62%">
          <stop offset="0%" stopColor="#55D6E8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#55D6E8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cv-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2FBFD4" />
          <stop offset="100%" stopColor="#0B3A52" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="375" height="812" fill="#070C16" />
      <rect x="0" y="470" width="375" height="342" fill="url(#cv-water)" opacity="0.55" />
      <ellipse cx="188" cy="470" rx="230" ry="180" fill="url(#cv-light)" />
      {/* voute */}
      <path
        d="M-20 -20 L 395 -20 L 395 340 C 340 300, 300 200, 240 190 C 200 184, 176 210, 150 214 C 100 222, 60 300, -20 356 Z"
        fill="#0B1220"
      />
      <path
        d="M-20 812 L -20 520 C 40 540, 90 620, 120 660 C 150 700, 130 760, 150 812 Z"
        fill="#0B1220"
      />
      <path
        d="M395 812 L 395 500 C 340 530, 300 620, 268 664 C 240 702, 258 764, 240 812 Z"
        fill="#0B1220"
      />
      <g opacity="0.35" stroke="#55D6E8" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M60 ${540 + i * 46} q 28 -6 56 0 t 56 0 t 56 0 t 56 0`} strokeWidth="1" />
        ))}
      </g>
    </>
  )
}
