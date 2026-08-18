import { useEffect, useRef, useState } from 'react'

/** Timeout auto-nettoye. ms = null -> desarme. */
export function useTimeout(fn: () => void, ms: number | null) {
  const ref = useRef(fn)
  ref.current = fn
  useEffect(() => {
    if (ms === null) return
    const id = window.setTimeout(() => ref.current(), ms)
    return () => window.clearTimeout(id)
  }, [ms])
}

/**
 * Revele `count` elements l'un apres l'autre.
 * Retourne le nombre d'elements visibles (0 -> count).
 */
export function useStagger(count: number, delay = 700, active = true, initialDelay = 250) {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    if (!active) return
    setVisible(0)
    let i = 0
    const timers: number[] = []
    for (i = 0; i < count; i++) {
      timers.push(
        window.setTimeout(() => setVisible((v) => Math.max(v, i + 1)), initialDelay + i * delay),
      )
    }
    return () => timers.forEach(window.clearTimeout)
  }, [count, delay, active, initialDelay])
  return visible
}

/** Machine a etapes simple, avec avance manuelle et/ou automatique. */
export function useSteps(auto?: { until: number; delay: number }) {
  const [step, setStep] = useState(0)
  const advance = () => setStep((s) => s + 1)
  useEffect(() => {
    if (!auto || step >= auto.until) return
    const id = window.setTimeout(() => setStep((s) => s + 1), auto.delay)
    return () => window.clearTimeout(id)
  }, [step, auto])
  return [step, advance, setStep] as const
}

/** Valeur qui monte de 0 a 1 tant que `holding` est vrai, et redescend sinon. */
export function useHoldGauge(holding: boolean, msToFull = 4200, decayFactor = 2.2) {
  const [value, setValue] = useState(0)
  const raf = useRef(0)
  const last = useRef(0)
  useEffect(() => {
    let cancelled = false
    last.current = 0
    const tick = (t: number) => {
      if (cancelled) return
      if (!last.current) last.current = t
      const dt = Math.min(64, t - last.current)
      last.current = t
      setValue((v) => {
        const delta = dt / msToFull
        const nv = holding ? v + delta : v - delta * decayFactor
        return Math.min(1, Math.max(0, nv))
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf.current)
    }
  }, [holding, msToFull, decayFactor])
  return value
}
