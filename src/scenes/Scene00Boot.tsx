import { useState } from 'react'
import { Backdrop, MedMap, CoordTicks } from '../art/Backdrops'
import { Chat, Souris } from '../art/Characters'
import { Cta, SceneShell } from '../components/ui'
import { copy, marks, storyConfig } from '../config/story.config'
import { useStagger, useTimeout } from '../hooks/useSequence'

export function Scene00Boot({
  onDone,
  hasSave,
  onContinue,
  onRestart,
}: {
  onDone: () => void
  hasSave: boolean
  onContinue: () => void
  onRestart: () => void
}) {
  const [rushed, setRushed] = useState(false)
  const auto = useStagger(5, 850, true, 350)
  const step = rushed ? 5 : auto
  const [leaving, setLeaving] = useState(false)

  useTimeout(() => onDone(), leaving ? 720 : null)

  return (
    <SceneShell
      className={leaving ? 'boot-leaving' : ''}
      backdrop={
        <Backdrop className="boot-map">
          <MedMap />
          <CoordTicks y={300} />
          <CoordTicks y={560} />
          {/* trace 2014 : continent -> Corse */}
          <path
            className="boot-route"
            d="M150 296 C 190 340, 220 420, 268 480"
            fill="none"
            stroke="#FF5A24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 7"
          />
          <circle cx="150" cy="296" r="4.5" fill="#FF5A24" />
          <circle cx="268" cy="480" r="4.5" fill="#55D6E8" />
          <circle className="boot-ping" cx="268" cy="480" r="14" fill="none" stroke="#55D6E8" strokeWidth="1.5" />
          <text x="160" y="288" className="map-label">LA GRANDE MOTTE</text>
          <text x="180" y="498" className="map-label">CORSE</text>
        </Backdrop>
      }
    >
      <div onPointerDown={() => setRushed(true)} className="boot-tap">
        <div className="stack gap-4">
          {step >= 1 && <p className="mono-line dim anim-in">{copy.boot.lines[0]}</p>}
          {step >= 2 && <p className="mono-line anim-in">{copy.boot.lines[1]}</p>}
        </div>

        {step >= 3 && (
          <div className="boot-card anim-in">
            <div className="boot-avatar">
              <Chat size={92} eyes="half" />
            </div>
            <div className="stack gap-4 boot-ident">
              <h1 className="headline boot-name">{copy.boot.player}</h1>
              <p className="mono-line">{copy.boot.alias}</p>
              <p className="mono-line dim">{copy.boot.build}</p>
              <p className="mono-line warn">{copy.boot.status}</p>
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="boot-connected anim-in">
            <Souris size={44} eyes="happy" />
            <span className="mono-line">{copy.boot.connected}</span>
          </div>
        )}

        <div className="spacer" />

        {step >= 5 && (
          <div className="stack gap-16 anim-in boot-title-block">
            <div className="stack gap-4">
              <h2 className="headline boot-title">{copy.boot.title}</h2>
              <p className="mono-line warn">{copy.boot.subtitle}</p>
            </div>

            {hasSave ? (
              <div className="stack gap-8">
                <p className="mono-line dim">{copy.boot.savedNote}</p>
                <div className="cta-row">
                  <Cta small onClick={onContinue}>
                    {copy.boot.continue}
                  </Cta>
                  <Cta small variant="ghost" onClick={onRestart}>
                    {copy.boot.restart}
                  </Cta>
                </div>
              </div>
            ) : (
              <Cta onClick={() => setLeaving(true)}>{copy.boot.cta}</Cta>
            )}

            <div className="boot-marks">
              <span>{marks.p1}</span>
              <span>{marks.p2}</span>
              <span>CO-OP SINCE {storyConfig.relationshipStartYear}</span>
            </div>
          </div>
        )}
      </div>
    </SceneShell>
  )
}
