import { useEffect, useState } from 'react'
import { Backdrop, StylizedRoom } from '../art/Backdrops'
import { Chat, Souris } from '../art/Characters'
import { Cta, MonoLines, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useDragProgress } from '../hooks/useDrag'
import { useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

type Phase = 'door' | 'inside' | 'kiss' | 'suitcase' | 'home'

const BUTTERFLIES = [
  { x: 12, y: 6, d: 0 },
  { x: 74, y: 14, d: 400 },
  { x: 32, y: -14, d: 800 },
  { x: 88, y: -6, d: 1200 },
  { x: 54, y: -30, d: 1600 },
]

export function Scene04Montpellier({ onDone, unlock }: SceneProps) {
  const [phase, setPhase] = useState<Phase>('door')
  const { t, handlers } = useDragProgress(210, 'x')

  const restored = useStagger(copy.montpellier.restored.length, 850, phase === 'kiss', 700)
  const homeLines = useStagger(copy.montpellier.home.length, 850, phase === 'home', 400)

  useTimeout(() => setPhase('suitcase'), phase === 'kiss' ? 3200 : null)

  useEffect(() => {
    if (phase === 'suitcase' && t >= 0.99) {
      setPhase('home')
      sfx('achievement')
      unlock('a-deux')
    }
  }, [t, phase, unlock])

  return (
    <SceneShell backdrop={<Backdrop><StylizedRoom /></Backdrop>}>
      <p className="mono-line dim">{copy.montpellier.header}</p>

      <div className="middle" style={{ width: '100%' }}>
        {phase === 'door' && (
          <div className="mp-stage">
            <div className="mp-souris">
              <Souris size={92} eyes="open" />
            </div>
          </div>
        )}

        {(phase === 'inside' || phase === 'kiss') && (
          <div className="mp-stage">
            <div className={`mp-duo ${phase === 'kiss' ? 'is-close' : ''}`}>
              <Chat size={98} eyes={phase === 'kiss' ? 'closed' : 'half'} />
              <Souris size={88} eyes={phase === 'kiss' ? 'closed' : 'happy'} />
            </div>
            <div className="mp-butterflies" aria-hidden="true">
              {BUTTERFLIES.map((b, i) => (
                <span key={i} style={{ left: `${b.x}%`, top: `${b.y}%`, animationDelay: `${b.d}ms` }}>
                  <Butterfly />
                </span>
              ))}
            </div>
            {phase === 'kiss' && <span className="mp-heart">♥</span>}
          </div>
        )}

        {phase === 'suitcase' && (
          <div className="mp-move" {...handlers}>
            <div className="mp-rail">
              <span className="mp-city">{copy.montpellier.from}</span>
              <span className="mp-rail-line" />
              <span className="mp-city to">{copy.montpellier.to}</span>
            </div>
            <div className="mp-suitcase" style={{ left: `calc(${8 + t * 76}%)` }}>
              <Suitcase />
            </div>
            <p className="hint mp-hint">{copy.montpellier.suitcaseHint}</p>
          </div>
        )}

        {phase === 'home' && (
          <div className="stack gap-16 center">
            <div className="mp-duo is-close">
              <Chat size={92} eyes="half" />
              <Souris size={80} eyes="happy" />
            </div>
            <MonoLines lines={copy.montpellier.home} visible={homeLines} tone="warn" />
          </div>
        )}
      </div>

      <div className="stack gap-8">
        {phase === 'door' && (
          <Cta
            onClick={() => {
              sfx('tap')
              setPhase('inside')
            }}
          >
            {copy.montpellier.ctaEnter}
          </Cta>
        )}

        {phase === 'inside' && (
          <>
            <div className="stack gap-4">
              <p className="mono-line anim-in">{copy.montpellier.hr}</p>
              <p className="mono-line warn anim-in">{copy.montpellier.butterflies}</p>
            </div>
            <Cta
              variant="blue"
              onClick={() => {
                sfx('heart')
                setPhase('kiss')
                unlock('connexion')
              }}
            >
              {copy.montpellier.ctaApproach}
            </Cta>
          </>
        )}

        {phase === 'kiss' && <MonoLines lines={copy.montpellier.restored} visible={restored} tone="" />}

        {phase === 'home' && homeLines >= copy.montpellier.home.length && (
          <Cta onClick={onDone}>{copy.ui.continue}</Cta>
        )}
      </div>
    </SceneShell>
  )
}

function Butterfly() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
      <path d="M11 9 C 6 1, 0 2, 1 8 C 2 14, 8 14, 11 9 Z" fill="#55D6E8" opacity="0.85" />
      <path d="M11 9 C 16 1, 22 2, 21 8 C 20 14, 14 14, 11 9 Z" fill="#3478F6" opacity="0.85" />
      <rect x="10.2" y="4" width="1.6" height="10" rx="0.8" fill="#F5F3EE" opacity="0.6" />
    </svg>
  )
}

function Suitcase() {
  return (
    <svg width="64" height="56" viewBox="0 0 64 56" fill="none" aria-hidden="true">
      <path d="M22 12 v-4 a4 4 0 0 1 4 -4 h12 a4 4 0 0 1 4 4 v4" stroke="#A9B1BD" strokeWidth="3" fill="none" />
      <rect x="4" y="12" width="56" height="38" rx="4" fill="#E63E48" />
      <rect x="4" y="12" width="56" height="38" rx="4" stroke="#F5F3EE" strokeWidth="1.5" opacity="0.3" fill="none" />
      <rect x="4" y="26" width="56" height="6" fill="#FF5A24" />
      <rect x="26" y="24" width="12" height="10" rx="2" fill="#0B1020" />
      <rect x="10" y="38" width="12" height="4" rx="2" fill="#F5F3EE" opacity="0.35" />
    </svg>
  )
}
