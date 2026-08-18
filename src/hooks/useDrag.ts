import { useCallback, useRef, useState } from 'react'

/**
 * Progression 0 -> 1 obtenue en glissant le doigt.
 * Volontairement permissif : on ne peut jamais reculer sous 0 ni echouer.
 */
export function useDragProgress(distance = 300, axis: 'x' | 'y' = 'y') {
  const [t, setT] = useState(0)
  const [dragging, setDragging] = useState(false)
  const origin = useRef({ pos: 0, t: 0 })

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
      origin.current = { pos: axis === 'y' ? e.clientY : e.clientX, t }
      setDragging(true)
    },
    [axis, t],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return
      const pos = axis === 'y' ? e.clientY : e.clientX
      const delta = axis === 'y' ? origin.current.pos - pos : pos - origin.current.pos
      setT(Math.min(1, Math.max(0, origin.current.t + delta / distance)))
    },
    [dragging, axis, distance],
  )

  const stop = useCallback(() => setDragging(false), [])

  return {
    t,
    dragging,
    setT,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: stop,
      onPointerCancel: stop,
      onPointerLeave: stop,
    },
  }
}

/** Position normalisee (0..1) du doigt dans l'element, pour le pilotage lateral. */
export function usePointerX(defaultX = 0.5) {
  const [x, setX] = useState(defaultX)
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    if (!r.width) return
    setX(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
  }, [])
  return { x, setX, onPointerMove }
}
