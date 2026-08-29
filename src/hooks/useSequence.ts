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

/**
 * Valeur qui monte de 0 a 1 tant que `holding` est vrai, et redescend sinon.
 *
 * Le calcul est base sur l'horloge reelle, pas sur le rythme des images :
 * une jauge annoncee a 7 s met exactement 7 s a se remplir, meme si la
 * scene rame. La version precedente cumulait les ecarts entre images en
 * les plafonnant a 64 ms, ce qui faisait perdre la moitie du temps des
 * que le telephone descendait sous 15 images par seconde.
 */
export function useHoldGauge(holding: boolean, msToFull = 4200, decayFactor = 2.2) {
  const [value, setValue] = useState(0)
  const valueRef = useRef(0)
  const raf = useRef(0)

  useEffect(() => {
    const base = valueRef.current
    const start = performance.now()
    let cancelled = false

    const tick = () => {
      if (cancelled) return
      const progress = (performance.now() - start) / msToFull
      const next = Math.min(
        1,
        Math.max(0, holding ? base + progress : base - progress * decayFactor),
      )
      if (next !== valueRef.current) {
        valueRef.current = next
        setValue(next)
      }
      /* Une fois la jauge a fond ou a zero, plus rien ne bouge tant que
         l'etat ne change pas : on arrete la boucle au lieu de tourner
         pour rien dans le vide. */
      if ((holding && next >= 1) || (!holding && next <= 0)) return
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
