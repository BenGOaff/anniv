import { useState } from 'react'
import { Backdrop, CarnonInterior } from '../art/Backdrops'
import { Chat, PeeWee, Pirate, Souris } from '../art/Characters'
import { Cta, MonoLines, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

const SPOTS = [
  { id: 'desk-chat', left: '20%', top: '74%' },
  { id: 'desk-souris', left: '80%', top: '74%' },
  { id: 'cats', left: '50%', top: '84%' },
  { id: 'sea', left: '50%', top: '22%' },
]

function Screen({ tint }: { tint: string }) {
  return (
    <svg className="cn-screen" width="46" height="34" viewBox="0 0 46 34" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="44" height="26" rx="2" fill="#0C1322" stroke="#2A3A5C" strokeWidth="1.5" />
      <rect x="4" y="4" width="38" height="20" fill={tint} opacity="0.45" />
      <path d="M8 20h10M8 16h20M8 12h14" stroke="#F5F3EE" strokeWidth="1.3" opacity="0.5" strokeLinecap="round" />
      <path d="M17 27h12l2 5H15z" fill="#1E2A46" />
    </svg>
  )
}

export function Scene09Carnon({ onDone, unlock }: SceneProps) {
  const [seen, setSeen] = useState<string[]>([])
  const [open, setOpen] = useState<string | null>(null)
  const [ending, setEnding] = useState(false)

  /* Les hotspots sont facultatifs : au bout de quelques secondes on avance. */
  useTimeout(() => finish(), !ending ? 14000 : null)

  function finish() {
    if (ending) return
    setEnding(true)
    setOpen(null)
    unlock('current-build')
  }

  const tap = (id: string) => {
    sfx('tap')
    setOpen(id)
    const next = seen.includes(id) ? seen : [...seen, id]
    setSeen(next)
    if (next.length >= SPOTS.length) window.setTimeout(finish, 1400)
  }

  const status = useStagger(copy.carnon.status.length, 800, ending, 500)
  const info = copy.carnon.hotspots.find((h) => h.id === open)

  return (
    <SceneShell backdrop={<Backdrop><CarnonInterior /></Backdrop>}>
      <div className="stack gap-4">
        <p className="mono-line dim">{copy.carnon.header}</p>
        {!ending && <p className="mono-line warn">{copy.carnon.hint}</p>}
      </div>

      {!ending && (
        <div className="cn-room">
          {/* deux postes de travail, la mer en face */}
          <span className="cn-station left">
            <Chat size={74} eyes="half" />
            <Screen tint="#3478F6" />
            <span className="cn-desk" />
          </span>
          <span className="cn-station right">
            <Souris size={66} eyes="open" />
            <Screen tint="#FF5A24" />
            <span className="cn-desk" />
          </span>
          <span className="cn-cats">
            <Pirate size={42} eyes="half" />
            <PeeWee size={42} eyes="closed" />
          </span>

          {SPOTS.map((s) => (
            <button
              key={s.id}
              className={`cn-spot ${seen.includes(s.id) ? 'seen' : ''} ${open === s.id ? 'active' : ''}`}
              style={{ left: s.left, top: s.top }}
              onClick={() => tap(s.id)}
              aria-label={copy.carnon.hotspots.find((h) => h.id === s.id)?.label}
            >
              <span className="cn-spot-dot" />
            </button>
          ))}

          {info && (
            <div className="cn-info panel anim-in">
              <p className="mono-line dim">{info.label}</p>
              <p className="cn-info-title">{info.title}</p>
              {info.lines.map((l) => (
                <p key={l} className="caption caption-dim">
                  {l}
                </p>
              ))}
            </div>
          )}

          <div className="cn-progress">
            {SPOTS.map((s) => (
              <span key={s.id} className={seen.includes(s.id) ? 'on' : ''} />
            ))}
          </div>
        </div>
      )}

      {ending && (
        <div className="middle" style={{ width: '100%' }}>
          <div className="cn-facing">
            <Chat size={100} eyes="closed" />
            <Souris size={84} eyes="closed" />
          </div>
          <div className="stack gap-12 center" style={{ marginTop: 24 }}>
            <MonoLines lines={copy.carnon.status} visible={status} tone="warn" />
            {status >= copy.carnon.status.length && (
              <div className="stack gap-8 center anim-in">
                <p className="caption">{copy.carnon.outro[0]}</p>
                <p className="caption cn-coop">{copy.carnon.outro[1]}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {ending && status >= copy.carnon.status.length && (
        <Cta onClick={onDone}>{copy.carnon.cta}</Cta>
      )}
    </SceneShell>
  )
}
