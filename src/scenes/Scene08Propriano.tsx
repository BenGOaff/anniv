import { useState } from 'react'
import { Backdrop, Seascape } from '../art/Backdrops'
import { Chat, PeeWee, Pirate, Souris } from '../art/Characters'
import { Cta, MonoLines, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

type Phase = 'loading' | 'title' | 'married'

export function Scene08Propriano({ onDone, unlock }: SceneProps) {
  const [phase, setPhase] = useState<Phase>('loading')
  useTimeout(() => setPhase('title'), phase === 'loading' ? 2600 : null)

  const unlockedLines = useStagger(copy.propriano.unlocked.length, 900, phase === 'married', 700)

  const sayYes = () => {
    sfx('reveal')
    setPhase('married')
    unlock('mariees')
  }

  return (
    <SceneShell
      backdrop={
        <Backdrop>
          <Seascape
            id="pro"
            skyTop="#22407A"
            skyBottom="#F0A472"
            seaTop="#2E7FA0"
            seaBottom="#0E2338"
            sunX={188}
            sunY={430}
            sunR={30}
            sunColor="#FFC79B"
            horizon={470}
            shape="open"
            farColor="#2A3A5E"
            midColor="#1A2540"
            nearColor="#0A1020"
          />
          {/* invites suggeres en silhouettes */}
          <g fill="#080D18" opacity="0.9">
            {[24, 52, 78, 104, 268, 296, 322, 350].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={700 - (i % 3) * 6} r="9" />
                <path d={`M${x - 11} ${744 - (i % 3) * 6} q11 -30 22 0 z`} />
              </g>
            ))}
          </g>
        </Backdrop>
      }
    >
      {phase === 'loading' && (
        <div className="middle">
          <p className="mono-line warn">{copy.propriano.loading}</p>
          <div className="pr-loader">
            <span />
          </div>
        </div>
      )}

      {phase !== 'loading' && (
        <>
          <div className="stack gap-4 anim-in">
            <h2 className="headline pr-place">{copy.propriano.place}</h2>
            <p className="mono-line warn">{copy.propriano.date}</p>
          </div>

          <div className="middle" style={{ width: '100%' }}>
            <div className={`pr-couple ${phase === 'married' ? 'is-married' : ''}`}>
              <Chat size={104} eyes={phase === 'married' ? 'happy' : 'half'} />
              <Souris size={88} eyes="happy" />
              {phase === 'married' && (
                <>
                  <span className="pr-cats">
                    <Pirate size={44} eyes="open" />
                    <PeeWee size={44} eyes="half" />
                  </span>
                  <div className="bf-particles" aria-hidden="true">
                    {Array.from({ length: 30 }, (_, i) => (
                      <span
                        key={i}
                        style={{
                          left: `${(i * 41) % 100}%`,
                          animationDelay: `${(i % 10) * 80}ms`,
                          background: ['#E63E48', '#FF5A24', '#55D6E8', '#F5F3EE'][i % 4],
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {phase === 'married' && (
              <div className="stack gap-12 center" style={{ marginTop: 26 }}>
                <MonoLines lines={copy.propriano.unlocked} visible={unlockedLines} tone="warn" />
                {unlockedLines >= copy.propriano.unlocked.length && (
                  <p className="caption caption-dim anim-in">{copy.propriano.note}</p>
                )}
              </div>
            )}
          </div>

          <div className="stack gap-8">
            {phase === 'title' && <Cta onClick={sayYes}>{copy.propriano.cta}</Cta>}
            {phase === 'married' && unlockedLines >= copy.propriano.unlocked.length && (
              <Cta onClick={onDone}>{copy.ui.continue}</Cta>
            )}
          </div>
        </>
      )}
    </SceneShell>
  )
}
