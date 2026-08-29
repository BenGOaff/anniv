import { useCallback, useEffect, useMemo, useState } from 'react'
import { sceneOrder, storyConfig, type SceneId, type AchievementId } from '../config/story.config'

/* Le numero de chapitre change la cle : les sauvegardes de test faites
   pendant la mise au point sont automatiquement ignorees, et l'ecran
   titre ne montre pas "PARTIE EN COURS" a la premiere joueuse. */
export const SAVE_KEY = 'cs57.save.v1'

export type SaveState = {
  scene: SceneId
  unlocked: AchievementId[]
  audio: boolean
  started: boolean
}

const emptySave: SaveState = {
  scene: 's00',
  unlocked: [],
  audio: storyConfig.flags.audioDefaultOn,
  started: false,
}

function readSave(): SaveState {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return emptySave
    const parsed = JSON.parse(raw) as Partial<SaveState>
    const scene =
      parsed.scene && (sceneOrder as readonly string[]).includes(parsed.scene) ? (parsed.scene as SceneId) : 's00'
    return {
      scene,
      unlocked: Array.isArray(parsed.unlocked) ? (parsed.unlocked as AchievementId[]) : [],
      audio: typeof parsed.audio === 'boolean' ? parsed.audio : emptySave.audio,
      started: Boolean(parsed.started),
    }
  } catch {
    return emptySave
  }
}

function writeSave(state: SaveState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
  } catch {
    /* mode prive Safari : on continue sans sauvegarde, jamais d'erreur visible */
  }
}

/* --- Parametres de debug / preview --------------------------------
   ?scene=10        ouvre directement une scene
   ?reset=1         efface la sauvegarde
   ?previewDate=... simule la date du jour (logique DEMAIN)
   ------------------------------------------------------------------ */
export function getParams() {
  if (typeof window === 'undefined') return new URLSearchParams()
  return new URLSearchParams(window.location.search)
}

export function useGameProgress() {
  const params = useMemo(getParams, [])

  const [state, setState] = useState<SaveState>(() => {
    const wiped = params.get('reset') === '1'
    if (wiped) {
      try {
        localStorage.removeItem(SAVE_KEY)
      } catch {
        /* ignore */
      }
    }
    const saved = wiped ? emptySave : readSave()
    /* ?scene= reste prioritaire, meme combine a ?reset=1 (mode preview). */
    const forced = params.get('scene')
    if (forced !== null) {
      const id = `s${forced.padStart(2, '0')}` as SceneId
      if ((sceneOrder as readonly string[]).includes(id)) {
        return { ...saved, scene: id, started: true }
      }
    }
    /* Au retour, on repasse toujours par l'ecran titre : il propose
       CONTINUER ou RECOMMENCER. La progression reste en memoire. */
    return { ...saved, scene: 's00' }
  })

  useEffect(() => {
    if (state.scene === 's00') {
      /* Depuis l'ecran titre, ne jamais ecraser le point de reprise. */
      const prev = readSave()
      writeSave({
        ...state,
        scene: prev.started ? prev.scene : 's00',
        started: prev.started || state.started,
      })
      return
    }
    writeSave(state)
  }, [state])

  const goTo = useCallback((scene: SceneId) => {
    setState((s) => (s.scene === scene ? s : { ...s, scene, started: true }))
  }, [])

  const next = useCallback(() => {
    setState((s) => {
      const i = sceneOrder.indexOf(s.scene)
      const nextScene = sceneOrder[Math.min(i + 1, sceneOrder.length - 1)]
      return { ...s, scene: nextScene, started: true }
    })
  }, [])

  const unlock = useCallback((id: AchievementId) => {
    setState((s) => (s.unlocked.includes(id) ? s : { ...s, unlocked: [...s.unlocked, id] }))
  }, [])

  const setAudio = useCallback((audio: boolean) => {
    setState((s) => ({ ...s, audio }))
  }, [])

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(SAVE_KEY)
    } catch {
      /* ignore */
    }
    setState({ ...emptySave, audio: state.audio })
  }, [state.audio])

  const hasSave = useMemo(() => {
    const saved = readSave()
    return saved.started && saved.scene !== 's00'
  }, [])

  return { state, goTo, next, unlock, setAudio, reset, hasSave, params }
}

/* --- Logique de date ---------------------------------------------- */

export function useGiftDateLabel() {
  const params = useMemo(getParams, [])
  return useMemo(() => {
    const preview = params.get('previewDate')
    const now = preview ? new Date(`${preview}T12:00:00`) : new Date()
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')}`
    const isEve = today === storyConfig.revealDate
    const isDay = today === storyConfig.giftDate
    return { isEve, isDay, today }
  }, [params])
}
