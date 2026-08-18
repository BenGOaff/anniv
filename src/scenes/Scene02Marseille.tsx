import { useEffect, useState } from 'react'
import { Backdrop, FerryTerminal, Seascape } from '../art/Backdrops'
import { Chat, Souris } from '../art/Characters'
import { Cta, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useDragProgress } from '../hooks/useDrag'
import { useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

type Phase = 'drive' | 'meet' | 'kiss' | 'hotel' | 'calanques'

/** Trajectoire de la voiture : une seule formule pour le guide et le vehicule. */
const carAt = (t: number) => ({
  left: 18 + t * 32 + Math.sin(t * Math.PI) * 10,
  bottom: 6 + t * 70,
})
const GUIDE = Array.from({ length: 13 }, (_, i) => carAt(i / 12))

export function Scene02Marseille({ onDone, unlock }: SceneProps) {
  const [phase, setPhase] = useState<Phase>('drive')
  const { t, dragging, handlers } = useDragProgress(300, 'y')

  useEffect(() => {
    if (phase === 'drive' && t >= 0.99) {
      setPhase('meet')
      sfx('map')
    }
  }, [t, phase])

  useTimeout(() => setPhase('hotel'), phase === 'kiss' ? 2600 : null)
  useTimeout(() => setPhase('calanques'), phase === 'hotel' ? 3400 : null)

  const kiss = () => {
    if (phase !== 'meet') return
    sfx('heart')
    setPhase('kiss')
    unlock('premier-baiser')
  }

  if (phase === 'calanques') {
    return (
      <SceneShell
        backdrop={
          <Backdrop>
            <Seascape
              id="cal"
              skyTop="#2B4C86"
              skyBottom="#EFA377"
              seaTop="#2C7E9E"
              seaBottom="#10233C"
              sunX={250}
            sunY={420}
            sunR={26}
            sunColor="#FFB07A"
              horizon={470}
              shape="calanques"
              farColor="#233255"
              midColor="#18233C"
              nearColor="#0C1322"
            />
          </Backdrop>
        }
      >
        <p className="mono-line dim">{copy.marseille.calanques}</p>
        <div className="middle">
          <div className="ms-sit anim-in">
            <Chat size={104} eyes="closed" />
            <Souris size={86} eyes="closed" />
          </div>
        </div>
        <Cta onClick={onDone}>{copy.ui.continue}</Cta>
      </SceneShell>
    )
  }

  if (phase === 'hotel') {
    return (
      <SceneShell
        backdrop={
          <Backdrop>
            <rect x="0" y="0" width="375" height="812" fill="#0C1322" />
            <rect x="0" y="620" width="375" height="192" fill="#131A2A" />
          </Backdrop>
        }
      >
        <div className="middle">
          <div className="ms-door">
            <div className="ms-door-frame">
              <div className="ms-door-light" />
              <div className="ms-door-panel">
                <span className="ms-door-knob" />
              </div>
            </div>
            <span className="ms-heart">♥</span>
          </div>
          <p className="headline ms-fasttravel">{copy.marseille.hotel}</p>
        </div>
      </SceneShell>
    )
  }

  return (
    <SceneShell backdrop={<Backdrop><FerryTerminal /></Backdrop>}>
      <div className="stack gap-4">
        <p className="mono-line dim">{copy.marseille.header}</p>
        {phase === 'drive' && <p className="mono-line warn">{copy.marseille.instruction}</p>}
      </div>

      <div className="ms-field" {...(phase === 'drive' ? handlers : {})}>
        {/* Guide : memes coordonnees que la voiture, donc toujours aligne. */}
        {GUIDE.map((g, i) => (
          <span
            key={i}
            className="ms-guide"
            style={{ left: `${g.left}%`, bottom: `${g.bottom}%`, opacity: 0.15 + i * 0.05 }}
          />
        ))}

        <div className="ms-souris" style={{ opacity: phase === 'kiss' ? 0 : 1 }}>
          <Souris size={72} eyes={phase === 'meet' ? 'happy' : 'open'} />
          {phase === 'drive' && <span className="ms-wait">{copy.marseille.waiting}</span>}
        </div>

        {phase === 'drive' && (
          <div
            className={`ms-car ${dragging ? 'is-dragging' : ''}`}
            style={{
              bottom: `${carAt(t).bottom}%`,
              left: `${carAt(t).left}%`,
            }}
          >
            <CarIcon />
          </div>
        )}

        {(phase === 'meet' || phase === 'kiss') && (
          <button className={`ms-duo ${phase === 'kiss' ? 'is-kiss' : ''}`} onClick={kiss}>
            <Chat size={90} eyes={phase === 'kiss' ? 'closed' : 'half'} />
            <Souris size={76} eyes={phase === 'kiss' ? 'closed' : 'happy'} />
            {phase === 'kiss' && <span className="ms-kiss-heart">♥</span>}
          </button>
        )}
      </div>

      <div className="stack gap-8">
        {phase === 'drive' && <p className="hint">{copy.marseille.hint}</p>}
        {phase === 'meet' && <p className="hint">{copy.marseille.arrived}</p>}
        {phase === 'kiss' && (
          <div className="stack gap-4 anim-in">
            <p className="mono-line alert">{copy.marseille.achievement}</p>
            <p className="mono-line dim">{copy.marseille.stamp}</p>
            <p className="mono-line warn">{copy.marseille.discretion}</p>
          </div>
        )}
      </div>
    </SceneShell>
  )
}

function CarIcon() {
  return (
    <svg width="86" height="46" viewBox="0 0 86 46" fill="none" aria-hidden="true">
      <path d="M4 34 L 8 22 C 10 17, 16 14, 24 14 L 54 14 C 62 14, 70 18, 76 24 L 82 30 L 82 36 L 4 36 Z" fill="#1E2A46" />
      <path d="M14 22 C 16 18, 20 17, 26 17 L 40 17 L 40 24 L 13 24 Z" fill="#55D6E8" opacity="0.75" />
      <path d="M44 17 L 54 17 C 60 17, 66 20, 70 24 L 44 24 Z" fill="#55D6E8" opacity="0.55" />
      <rect x="4" y="30" width="78" height="4" fill="#FF5A24" />
      <circle cx="23" cy="36" r="8" fill="#0B1020" />
      <circle cx="23" cy="36" r="3.4" fill="#A9B1BD" />
      <circle cx="66" cy="36" r="8" fill="#0B1020" />
      <circle cx="66" cy="36" r="3.4" fill="#A9B1BD" />
      <circle cx="81" cy="27" r="2.6" fill="#F5F3EE" />
    </svg>
  )
}
