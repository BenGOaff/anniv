import { useCallback, useEffect, useMemo, useState } from 'react'
import { AchievementPatch, ChapterCard, Hud, RotateGate } from './components/ui'
import {
  achievements,
  chapters,
  sceneOrder,
  type Achievement,
  type AchievementId,
  type SceneId,
} from './config/story.config'
import { useGameProgress } from './hooks/useGameProgress'
import { setAudioEnabled, startAmbience, stopAmbience } from './lib/audio'
import { Scene00Boot } from './scenes/Scene00Boot'
import { Scene01Gayvox } from './scenes/Scene01Gayvox'
import { Scene02Marseille } from './scenes/Scene02Marseille'
import { Scene03Distance } from './scenes/Scene03Distance'
import { Scene04Montpellier } from './scenes/Scene04Montpellier'
import { Scene05Party } from './scenes/Scene05Party'
import { Scene06Levels } from './scenes/Scene06Levels'
import { Scene07Bonifacio } from './scenes/Scene07Bonifacio'
import { Scene08Propriano } from './scenes/Scene08Propriano'
import { Scene09Carnon } from './scenes/Scene09Carnon'
import { Scene10Camargue } from './scenes/Scene10Camargue'
import { Scene11Epilogue } from './scenes/Scene11Epilogue'

export default function App() {
  const { state, goTo, next, unlock, setAudio, reset, hasSave, params } = useGameProgress()
  const [patch, setPatch] = useState<Achievement | null>(null)
  const debug = params.get('debug') === '1'

  useEffect(() => {
    setAudioEnabled(state.audio)
    if (state.audio) startAmbience()
    else stopAmbience()
  }, [state.audio])

  const award = useCallback(
    (id: AchievementId) => {
      unlock(id)
      setPatch(achievements.find((a) => a.id === id) ?? null)
    },
    [unlock],
  )

  const index = useMemo(() => sceneOrder.indexOf(state.scene), [state.scene])
  const chapter = chapters[state.scene]
  /* La quete secrete ne doit rien trahir : ni titre de chapitre,
     ni barre de progression qui montrerait qu'il reste du jeu. */
  const secret = state.scene === 's10'

  const scene = renderScene(state.scene, {
    onDone: next,
    unlock: award,
    hasSave,
    onContinue: () => goTo(readResumeScene()),
    onRestart: () => {
      reset()
      goTo('s01')
    },
    onReplay: () => {
      reset()
      goTo('s00')
      window.location.reload()
    },
  })

  return (
    <div className="stage">
      <div key={state.scene} className="stage-scene">
        {scene}
      </div>

      <Hud
        chapter={secret ? undefined : chapter ? `${chapter.index} ${chapter.title}` : 'ÉPILOGUE'}
        index={index}
        total={sceneOrder.length}
        audio={state.audio}
        onToggleAudio={() => setAudio(!state.audio)}
        showProgress={!secret}
      />

      <AchievementPatch achievement={patch} />

      {chapter && state.scene !== 's00' && !secret && (
        <ChapterCard key={`ch-${state.scene}`} {...chapter} />
      )}

      <RotateGate />

      {debug && (
        <div className="debug-bar">
          {sceneOrder.map((s) => (
            <button
              key={s}
              className={s === state.scene ? 'on' : ''}
              onClick={() => goTo(s)}
            >
              {s.slice(1)}
            </button>
          ))}
          <button
            onClick={() => {
              reset()
              window.location.href = window.location.pathname + '?debug=1'
            }}
          >
            RESET
          </button>
        </div>
      )}
    </div>
  )
}

/** Scene de reprise : celle enregistree dans la sauvegarde. */
function readResumeScene(): SceneId {
  try {
    const raw = localStorage.getItem('cs55.save.v2')
    if (raw) {
      const parsed = JSON.parse(raw) as { scene?: string }
      if (parsed.scene && (sceneOrder as readonly string[]).includes(parsed.scene)) {
        return parsed.scene as SceneId
      }
    }
  } catch {
    /* ignore */
  }
  return 's01'
}

type Handlers = {
  onDone: () => void
  unlock: (id: AchievementId) => void
  hasSave: boolean
  onContinue: () => void
  onRestart: () => void
  onReplay: () => void
}

function renderScene(id: SceneId, h: Handlers) {
  switch (id) {
    case 's00':
      return (
        <Scene00Boot
          onDone={h.onDone}
          hasSave={h.hasSave}
          onContinue={h.onContinue}
          onRestart={h.onRestart}
        />
      )
    case 's01':
      return <Scene01Gayvox onDone={h.onDone} unlock={h.unlock} />
    case 's02':
      return <Scene02Marseille onDone={h.onDone} unlock={h.unlock} />
    case 's03':
      return <Scene03Distance onDone={h.onDone} unlock={h.unlock} />
    case 's04':
      return <Scene04Montpellier onDone={h.onDone} unlock={h.unlock} />
    case 's05':
      return <Scene05Party onDone={h.onDone} unlock={h.unlock} />
    case 's06':
      return <Scene06Levels onDone={h.onDone} unlock={h.unlock} />
    case 's07':
      return <Scene07Bonifacio onDone={h.onDone} unlock={h.unlock} />
    case 's08':
      return <Scene08Propriano onDone={h.onDone} unlock={h.unlock} />
    case 's09':
      return <Scene09Carnon onDone={h.onDone} unlock={h.unlock} />
    case 's10':
      return <Scene10Camargue onDone={h.onDone} unlock={h.unlock} />
    case 's11':
      return <Scene11Epilogue onReplay={h.onReplay} />
  }
}
