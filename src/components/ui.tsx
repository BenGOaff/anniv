/* ============================================================
   Briques d'interface partagees par toutes les scenes.
   ============================================================ */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { marks, type Achievement } from '../config/story.config'
import { sfx } from '../lib/audio'

/* ---------- HUD ---------- */

export function Hud({
  chapter,
  index,
  total,
  audio,
  onToggleAudio,
  showProgress = true,
}: {
  chapter?: string
  index: number
  total: number
  audio: boolean
  onToggleAudio: () => void
  showProgress?: boolean
}) {
  return (
    <div className="hud" aria-hidden={false}>
      <div className="hud-top">
        <div className="hud-tag">
          <b>{marks.signature}</b>
          {chapter && <span className="hud-chapter">// {chapter}</span>}
        </div>
        <button
          className="hud-btn"
          aria-pressed={audio}
          aria-label={audio ? 'Couper le son' : 'Activer le son'}
          onClick={onToggleAudio}
        >
          <SoundIcon on={audio} />
        </button>
      </div>
      <div className="hud-bottom" hidden={!showProgress}>
        {showProgress &&
          Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`hud-seg ${i < index ? 'done' : ''} ${i === index ? 'now' : ''}`}
            />
          ))}
      </div>
    </div>
  )
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
      {on ? (
        <>
          <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
          <path d="M19 6a9 9 0 0 1 0 12" strokeLinecap="round" opacity="0.6" />
        </>
      ) : (
        <path d="M17 9.5l4 5M21 9.5l-4 5" strokeLinecap="round" />
      )}
    </svg>
  )
}

/* ---------- Carte de chapitre ---------- */

export function ChapterCard({
  index,
  title,
  place,
}: {
  index: string
  title: string
  place: string
}) {
  return (
    <div className="chapter-card">
      <div className="chapter-rule" />
      <div className="chapter-index">CHAPITRE {index}</div>
      <h2 className="chapter-title">{title}</h2>
      <div className="chapter-place">{place}</div>
      <div className="chapter-marks">
        <span>{marks.division}</span>
        <span>{marks.unit}</span>
      </div>
    </div>
  )
}

/* ---------- Coquille de scene ---------- */

export function SceneShell({
  backdrop,
  chapter,
  children,
  hud,
  className,
}: {
  backdrop?: ReactNode
  chapter?: { index: string; title: string; place: string } | null
  children: ReactNode
  hud?: ReactNode
  className?: string
}) {
  return (
    <section className={`scene ${className ?? ''}`}>
      {backdrop}
      <div className="scene-layer scene-enter">{children}</div>
      {hud}
      {chapter && <ChapterCard {...chapter} />}
    </section>
  )
}

/* ---------- Boutons ---------- */

export function Cta({
  children,
  onClick,
  variant,
  small,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  variant?: 'ghost' | 'blue'
  small?: boolean
  disabled?: boolean
}) {
  return (
    <button
      className={`cta ${variant ?? ''} ${small ? 'small' : ''}`}
      onClick={() => {
        sfx('tap')
        onClick()
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

/** Bouton a maintenir : la jauge est pilotee par le parent. */
export function HoldButton({
  label,
  value,
  onHoldChange,
}: {
  label: string
  value: number
  onHoldChange: (holding: boolean) => void
}) {
  const [holding, setHolding] = useState(false)
  const set = (v: boolean) => {
    setHolding(v)
    onHoldChange(v)
  }
  return (
    <button
      className="hold"
      data-holding={holding}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        set(true)
      }}
      onPointerUp={() => set(false)}
      onPointerCancel={() => set(false)}
      onPointerLeave={() => set(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <span className="hold-fill" style={{ transform: `scaleX(${value})` }} />
      <span className="hold-label">{label}</span>
    </button>
  )
}

/* ---------- Patch d'achievement ---------- */

export function AchievementPatch({ achievement }: { achievement: Achievement | null }) {
  const [shown, setShown] = useState<Achievement | null>(null)
  const timer = useRef(0)

  useEffect(() => {
    if (!achievement) return
    setShown(achievement)
    sfx('achievement')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setShown(null), 2800)
    return () => window.clearTimeout(timer.current)
  }, [achievement])

  if (!shown) return null
  return (
    <div className="patch-wrap">
      <div className={`patch tone-${shown.tone}`}>
        <span className="patch-badge">{shown.code}</span>
        <span className="patch-text">
          <span className="patch-title">{shown.label}</span>
          <span className="patch-ctx">{shown.context}</span>
        </span>
      </div>
    </div>
  )
}

/* ---------- Lignes monospace revelees une a une ---------- */

export function MonoLines({
  lines,
  visible,
  tone = 'dim',
}: {
  lines: readonly string[]
  visible: number
  tone?: 'dim' | 'warn' | 'alert' | ''
}) {
  return (
    <div className="stack gap-4">
      {lines.slice(0, visible).map((l, i) => (
        <p key={l + i} className={`mono-line ${tone} anim-in`}>
          {l}
        </p>
      ))}
    </div>
  )
}

/* ---------- Flash orange court ---------- */

export function Flash({ trigger }: { trigger: number }) {
  if (!trigger) return null
  return <div className="flash" key={trigger} />
}

/* ---------- Garde-fou paysage ---------- */

export function RotateGate() {
  return (
    <div className="rotate-gate">
      <svg className="rotate-icon" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#FF5A24" strokeWidth="1.6">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18.5h2" strokeLinecap="round" />
      </svg>
      <p className="headline" style={{ fontSize: 26 }}>
        REMETS L’ÉCRAN EN PORTRAIT
      </p>
      <p className="caption caption-dim">Ce chapitre se joue à la verticale.</p>
    </div>
  )
}
