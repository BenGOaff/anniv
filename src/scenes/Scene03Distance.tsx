import { useEffect, useMemo, useRef, useState } from 'react'
import { Backdrop, MedMap } from '../art/Backdrops'
import { Cta, HoldButton, MonoLines, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useHoldGauge, useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

type Phase = 'link' | 'lost' | 'checking' | 'found'

/* Points de la carte (coordonnees du viewBox 375 x 812). */
const CHAT = { x: 150, y: 300 }
const WAYPOINTS = [
  { x: 278, y: 505 }, // Corse
  { x: 176, y: 196 }, // Bron
  { x: 306, y: 150 }, // Suisse
  { x: 176, y: 196 }, // Bron
]
const NODES = [
  { x: CHAT.x, y: CHAT.y, label: copy.distance.nodes[1] },
  { x: 278, y: 505, label: copy.distance.nodes[0] },
  { x: 176, y: 196, label: copy.distance.nodes[2] },
  { x: 306, y: 150, label: copy.distance.nodes[3] },
]

export function Scene03Distance({ onDone, unlock }: SceneProps) {
  const [phase, setPhase] = useState<Phase>('link')
  const [holding, setHolding] = useState(false)
  const value = useHoldGauge(holding && phase === 'link', 5200, 0.8)

  const lineRef = useRef<SVGLineElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)
  const raf = useRef(0)

  /* Deplacement continu du marqueur Souris.
     Mutation directe du DOM : aucun rendu React par frame. */
  useEffect(() => {
    if (phase !== 'link') return
    const t0 = performance.now()
    const legMs = 3400
    const tick = (t: number) => {
      const total = Math.max(0, (t - t0) / legMs)
      const i = Math.floor(total) % WAYPOINTS.length
      const j = (i + 1) % WAYPOINTS.length
      const k = total % 1
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
      const x = WAYPOINTS[i].x + (WAYPOINTS[j].x - WAYPOINTS[i].x) * e
      const y = WAYPOINTS[i].y + (WAYPOINTS[j].y - WAYPOINTS[i].y) * e
      dotRef.current?.setAttribute('cx', String(x))
      dotRef.current?.setAttribute('cy', String(y))
      ringRef.current?.setAttribute('cx', String(x))
      ringRef.current?.setAttribute('cy', String(y))
      lineRef.current?.setAttribute('x2', String(x))
      lineRef.current?.setAttribute('y2', String(y))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [phase])

  /* La rupture est scriptee : on ne peut pas "rater", l'histoire avance. */
  useEffect(() => {
    if (phase === 'link' && value >= 1) {
      setPhase('lost')
      sfx('lock')
    }
  }, [value, phase])

  useTimeout(() => setPhase('checking'), phase === 'lost' ? 1800 : null)
  useTimeout(() => {
    setPhase('found')
    unlock('sauvegarde')
  }, phase === 'checking' ? 1900 : null)

  const foundLines = useStagger(copy.distance.found.length, 900, phase === 'found', 300)
  const warn = value > 0.72 ? 2 : value > 0.4 ? 1 : value > 0.12 ? 0 : -1
  const dark = phase !== 'link'

  const backdrop = useMemo(
    () => (
      <Backdrop>
        <MedMap />
        {NODES.map((n) => (
          <g key={n.label} opacity="0.75">
            <circle cx={n.x} cy={n.y} r="3" fill="#A9B1BD" />
            <text x={n.x} y={n.y - 10} className="map-label">
              {n.label}
            </text>
          </g>
        ))}
        <line
          ref={lineRef}
          className="ld-link"
          x1={CHAT.x}
          y1={CHAT.y}
          x2={WAYPOINTS[0].x}
          y2={WAYPOINTS[0].y}
        />
        <circle cx={CHAT.x} cy={CHAT.y} r="9" fill="none" stroke="#3478F6" strokeWidth="1.5" className="ld-pulse" />
        <circle cx={CHAT.x} cy={CHAT.y} r="5" fill="#3478F6" />
        <circle ref={ringRef} r="9" fill="none" stroke="#E63E48" strokeWidth="1.5" className="ld-pulse" />
        <circle ref={dotRef} r="5" fill="#E63E48" />
      </Backdrop>
    ),
    [],
  )

  return (
    <SceneShell className={`${dark ? 'ld-dark' : ''} ${holding ? 'ld-linked' : ''}`} backdrop={backdrop}>
      <div className="stack gap-4">
        <p className="mono-line dim">{copy.distance.header}</p>
        {phase === 'link' && (
          <div className="stack gap-4">
            {warn === 0 && <p className="mono-line warn anim-in">{copy.distance.warnings[0]}</p>}
            {warn === 1 && <p className="mono-line warn anim-in">{copy.distance.warnings[1]}</p>}
            {warn === 2 && <p className="mono-line alert anim-in">{copy.distance.warnings[2]}</p>}
          </div>
        )}
      </div>

      <div className="middle">
        {phase === 'lost' && <p className="headline ld-lost">{copy.distance.lost}</p>}
        {phase === 'checking' && <p className="mono-line warn anim-in">{copy.distance.checking}</p>}
        {phase === 'found' && (
          <div className="stack gap-16 center">
            <MonoLines lines={copy.distance.found} visible={foundLines} tone="" />
            {foundLines >= 2 && (
              <div className="ld-two-dots anim-in">
                <span className="ld-dot blue" />
                <span className="ld-dot-gap" />
                <span className="ld-dot red" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="stack gap-8">
        {phase === 'link' && (
          <>
            <HoldButton label={copy.distance.instruction} value={value} onHoldChange={setHolding} />
            <p className="hint">{copy.distance.hint}</p>
          </>
        )}
        {phase === 'found' && foundLines >= 2 && <Cta onClick={onDone}>{copy.ui.continue}</Cta>}
      </div>
    </SceneShell>
  )
}
