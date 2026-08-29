import { useEffect, useRef, useState } from 'react'
import { Backdrop } from '../art/Backdrops'
import { Chat, Souris } from '../art/Characters'
import { Cta, HoldButton, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useHoldGauge, useStagger, useTimeout } from '../hooks/useSequence'
import type { SceneProps } from './types'

/* Scene sobre : aucun score, aucun boss, aucune blague.
   Une seule interaction — rester la. */

export function Scene06Levels({ onDone, unlock }: SceneProps) {
  const [holding, setHolding] = useState(false)
  const [done, setDone] = useState(false)
  const releases = useRef(0)
  const [assist, setAssist] = useState(false)

  const value = useHoldGauge(holding && !done, 7000, assist ? 0 : 0.5)

  const handleHold = (h: boolean) => {
    setHolding(h)
    if (!h && !done) {
      releases.current += 1
      /* Aide automatique : apres deux relachements, la jauge ne redescend plus. */
      if (releases.current >= 2) setAssist(true)
    }
  }

  useEffect(() => {
    if (value >= 1 && !done) {
      setDone(true)
      unlock('toujours-la')
    }
  }, [value, done, unlock])

  const outro = useStagger(copy.levels.outro.length, 1400, done, 900)
  const [canLeave, setCanLeave] = useState(false)
  useTimeout(() => setCanLeave(true), outro >= copy.levels.outro.length ? 1600 : null)

  const wordIndex = Math.min(copy.levels.words.length - 1, Math.floor(value * copy.levels.words.length))
  /* Quantifie : le filtre du decor ne change que par paliers de 5 %,
     au lieu d'etre recalcule a chaque image sur un grand SVG. */
  const color = done ? 1 : Math.round(value * 20) / 20

  return (
    <SceneShell
      backdrop={
        <Backdrop
          style={{
            filter: `saturate(${(0.1 + color * 0.9).toFixed(3)}) brightness(${(0.55 + color * 0.45).toFixed(3)})`,
            transition: done ? 'filter 2600ms cubic-bezier(0.16,1,0.3,1)' : 'filter 260ms linear',
          }}
        >
          <defs>
            <linearGradient id="lv-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16233F" />
              <stop offset="55%" stopColor="#3E4C74" />
              <stop offset="100%" stopColor="#C9714F" />
            </linearGradient>
            <linearGradient id="lv-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A2137" />
              <stop offset="100%" stopColor="#0A0F1B" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="375" height="560" fill="url(#lv-sky)" />
          <circle cx="188" cy="548" r="54" fill="#E8895F" opacity="0.55" />
          <rect x="0" y="556" width="375" height="256" fill="url(#lv-ground)" />
          <line x1="0" y1="556" x2="375" y2="556" stroke="#F5F3EE" strokeWidth="1" opacity="0.2" />
        </Backdrop>
      }
    >
      {/* mots traverses, en arriere-plan, un par un */}
      <div className="lv-words" aria-hidden="true">
        {value > 0.04 && !done && (
          <span key={wordIndex} className="lv-word">
            {copy.levels.words[wordIndex]}
          </span>
        )}
      </div>

      <div className="stack gap-4">
        {!done && (
          <>
            <p className="caption lv-intro">{copy.levels.intro[0]}</p>
            <p className="caption lv-intro">{copy.levels.intro[1]}</p>
          </>
        )}
      </div>

      <div className="middle">
        <div className="lv-duo">
          <Chat size={104} eyes={done ? 'happy' : 'half'} />
          <Souris size={88} eyes={done ? 'happy' : 'open'} />
        </div>

        {done && (
          <div className="stack gap-12 center lv-outro">
            {outro >= 1 && <p className="headline lv-still">{copy.levels.outro[0]}</p>}
            {outro >= 2 && <p className="caption anim-in">{copy.levels.outro[1]}</p>}
            {outro >= 3 && <p className="caption anim-in">{copy.levels.outro[2]}</p>}
            {outro >= 4 && <p className="caption lv-thanks anim-in">{copy.levels.outro[3]}</p>}
          </div>
        )}
      </div>

      <div className="stack gap-8">
        {!done && (
          <>
            <div className="lv-gauge">
              <span className="lv-gauge-label">{copy.levels.gauge}</span>
              <span className="lv-gauge-track">
                <span className="lv-gauge-fill" style={{ transform: `scaleX(${value})` }} />
              </span>
            </div>
            <HoldButton label={copy.levels.cta} value={value} onHoldChange={handleHold} />
          </>
        )}
        {done && canLeave && <Cta onClick={onDone}>{copy.ui.continue}</Cta>}
      </div>
    </SceneShell>
  )
}
