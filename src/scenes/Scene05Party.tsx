import { useState } from 'react'
import { Backdrop, TopoLines } from '../art/Backdrops'
import { PeeWee, Pirate } from '../art/Characters'
import { Cta, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

export function Scene05Party({ onDone, unlock }: SceneProps) {
  const [open, setOpen] = useState<[boolean, boolean]>([false, false])
  const both = open[0] && open[1]

  const openCrate = (i: 0 | 1) => {
    if (open[i]) return
    sfx('achievement')
    const next: [boolean, boolean] = [...open] as [boolean, boolean]
    next[i] = true
    setOpen(next)
    unlock(i === 0 ? 'pirate' : 'peewee')
  }

  return (
    <SceneShell
      backdrop={
        <Backdrop>
          <defs>
            <linearGradient id="pt-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A2540" />
              <stop offset="100%" stopColor="#0B111F" />
            </linearGradient>
            <radialGradient id="pt-lamp">
              <stop offset="0%" stopColor="#FF9A5C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF9A5C" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="375" height="812" fill="url(#pt-bg)" />
          <TopoLines opacity={0.08} stroke="#FF5A24" />
          <circle cx="188" cy="330" r="230" fill="url(#pt-lamp)" />
          <rect x="0" y="640" width="375" height="172" fill="#0A0F1C" />
          <line x1="0" y1="640" x2="375" y2="640" stroke="#1E2A46" strokeWidth="2" />
        </Backdrop>
      }
    >
      <p className="mono-line dim">{copy.party.header}</p>

      <div className="middle" style={{ width: '100%' }}>
        <div className="pt-crates">
          <Crate
            index="01"
            open={open[0]}
            name={copy.party.pirate}
            onOpen={() => openCrate(0)}
            cat={<Pirate size={78} eyes="open" />}
          />
          <Crate
            index="02"
            open={open[1]}
            name={copy.party.peewee}
            onOpen={() => openCrate(1)}
            cat={<PeeWee size={78} eyes="half" />}
          />
        </div>

        {!both && <p className="hint" style={{ marginTop: 22 }}>{copy.party.hint}</p>}

        {both && (
          <div className="stack gap-8 center anim-in" style={{ marginTop: 22 }}>
            <p className="headline" style={{ fontSize: 30, color: 'var(--orange)' }}>
              {copy.party.size}
            </p>
            <p className="caption caption-dim">{copy.party.note}</p>
          </div>
        )}
      </div>

      {both && <Cta onClick={onDone}>{copy.ui.continue}</Cta>}
    </SceneShell>
  )
}

function Crate({
  index,
  open,
  name,
  onOpen,
  cat,
}: {
  index: string
  open: boolean
  name: string
  onOpen: () => void
  cat: React.ReactNode
}) {
  return (
    <button className={`pt-crate ${open ? 'is-open' : ''}`} onClick={onOpen} disabled={open}>
      <span className="pt-cat">{cat}</span>
      <span className="pt-box">
        <span className="pt-lid">
          <svg width="134" height="22" viewBox="0 0 134 22" fill="none" aria-hidden="true">
            <rect x="2" y="3" width="130" height="17" rx="3" fill="#26334F" stroke="#3A4A6E" strokeWidth="2" />
            <rect x="2" y="9" width="130" height="5" fill="#FF5A24" opacity="0.8" />
          </svg>
        </span>
        <svg width="122" height="86" viewBox="0 0 122 86" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="116" height="80" rx="3" fill="#1C2740" stroke="#2E3C5C" strokeWidth="2" />
          <rect x="3" y="40" width="116" height="11" fill="#FF5A24" opacity="0.85" />
          <rect x="30" y="3" width="8" height="80" fill="#0F1728" opacity="0.5" />
          <rect x="84" y="3" width="8" height="80" fill="#0F1728" opacity="0.5" />
          <rect x="44" y="58" width="34" height="18" rx="2" fill="#0F1728" />
          <text x="61" y="71" className="pt-index">
            {index}
          </text>
          <path d="M3 12 h116 M3 74 h116" stroke="#2E3C5C" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </span>
      <span className={`pt-name ${open ? 'visible' : ''}`}>{name}</span>
    </button>
  )
}
