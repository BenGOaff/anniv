import { useState } from 'react'
import { Backdrop, TopoLines } from '../art/Backdrops'
import { Souris } from '../art/Characters'
import { Cta, MonoLines, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

type Phase = 'visits' | 'message' | 'sending' | 'call' | 'ringing' | 'connected'

export function Scene01Gayvox({ onDone, unlock }: SceneProps) {
  const [visits, setVisits] = useState(0)
  const [phase, setPhase] = useState<Phase>('visits')

  const lines = useStagger(copy.gayvox.callLines.length, 780, phase === 'connected', 500)

  useTimeout(() => setPhase('call'), phase === 'sending' ? 1400 : null)
  useTimeout(() => {
    setPhase('connected')
    unlock('crush-vocal')
  }, phase === 'ringing' ? 1500 : null)

  const tapCard = () => {
    if (phase !== 'visits') return
    sfx('tap')
    const n = visits + 1
    setVisits(n)
    if (n >= 3) setPhase('message')
  }

  return (
    <SceneShell
      backdrop={
        <Backdrop>
          <defs>
            <linearGradient id="gx-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16203A" />
              <stop offset="100%" stopColor="#0A101E" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="375" height="812" fill="url(#gx-bg)" />
          <TopoLines opacity={0.09} stroke="#3478F6" />
          <g opacity="0.1" stroke="#A9B1BD" strokeWidth="0.6">
            {Array.from({ length: 20 }, (_, i) => (
              <line key={i} x1="0" y1={i * 44} x2="375" y2={i * 44} />
            ))}
          </g>
        </Backdrop>
      }
    >
      <p className="mono-line dim">{copy.gayvox.header}</p>

      <div className="middle gap-16 stack" style={{ width: '100%' }}>
        {/* ----- fenetre profil ----- */}
        <div className={`gx-window ${phase === 'sending' ? 'is-sending' : ''}`}>
          <div className="gx-bar">
            <span className="gx-dots">
              <i /> <i /> <i />
            </span>
            <span className="gx-bar-title">PROFILS · VISITEURS</span>
          </div>

          <button className="gx-card" onClick={tapCard} disabled={phase !== 'visits'}>
            <span className="gx-avatar">
              <Souris size={58} eyes="open" />
              <span className="gx-online" />
            </span>
            <span className="gx-info">
              <span className="gx-pseudo">{copy.gayvox.profile}</span>
              <span className="gx-meta">{copy.gayvox.profileMeta}</span>
            </span>
            {visits > 0 && <span className="gx-counter">×{visits}</span>}
          </button>

          <div className="gx-visits">
            {copy.gayvox.visits.slice(0, visits).map((v) => (
              <span key={v} className="gx-visit anim-in">
                {v}
              </span>
            ))}
          </div>
        </div>

        {phase === 'visits' && (
          <p className="hint">{copy.gayvox.hintVisit}</p>
        )}

        {visits >= 3 && phase !== 'visits' && (
          <p className="caption caption-dim anim-in">{copy.gayvox.insist}</p>
        )}

        {/* ----- appel ----- */}
        {(phase === 'ringing' || phase === 'connected') && (
          <div className="gx-wave anim-in" aria-hidden="true">
            {Array.from({ length: 22 }, (_, i) => (
              <span key={i} style={{ animationDelay: `${i * 55}ms` }} />
            ))}
          </div>
        )}

        {phase === 'connected' && (
          <MonoLines lines={copy.gayvox.callLines} visible={lines} tone="warn" />
        )}
      </div>

      <div className="stack gap-8">
        {phase === 'message' && (
          <Cta
            onClick={() => {
              sfx('message')
              setPhase('sending')
            }}
          >
            {copy.gayvox.ctaMessage}
          </Cta>
        )}
        {phase === 'sending' && <p className="mono-line warn">{copy.gayvox.messageSent}</p>}
        {phase === 'call' && (
          <Cta
            variant="blue"
            onClick={() => {
              sfx('phone')
              setPhase('ringing')
            }}
          >
            <PhoneIcon /> {copy.gayvox.ctaCall}
          </Cta>
        )}
        {phase === 'connected' && lines >= copy.gayvox.callLines.length && (
          <Cta onClick={onDone}>{copy.ui.continue}</Cta>
        )}
      </div>
    </SceneShell>
  )
}

function PhoneIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"
        strokeLinejoin="round"
      />
    </svg>
  )
}
