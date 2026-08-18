import { useState } from 'react'
import { Backdrop, Seascape } from '../art/Backdrops'
import { Chat, PeeWee, Pirate, Souris } from '../art/Characters'
import { Cta, PhotoPlate, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'

type Phase = 'letter' | 'final' | 'cats-cross' | 'cats-notif' | 'cats-talk' | 'remember'

export function Scene11Epilogue({ onReplay }: { onReplay: () => void }) {
  const [phase, setPhase] = useState<Phase>('letter')
  const [photoOk, setPhotoOk] = useState(false)
  const lines = useStagger(copy.epilogue.lines.length, 2200, phase === 'letter', 900)

  useTimeout(
    () => setPhase('final'),
    phase === 'letter' && lines >= copy.epilogue.lines.length ? 2000 : null,
  )
  useTimeout(() => setPhase('cats-cross'), phase === 'final' ? 4200 : null)
  useTimeout(() => setPhase('cats-notif'), phase === 'cats-cross' ? 2200 : null)

  return (
    <SceneShell
      backdrop={
        <Backdrop>
          <Seascape
            id="epi"
            skyTop="#141F3A"
            skyBottom="#B9694F"
            seaTop="#3A5E82"
            seaBottom="#0B1220"
            sunX={188}
            sunY={452}
            sunR={22}
            sunColor="#FFB98C"
            horizon={470}
            shape="open"
            farColor="#1E2A47"
            midColor="#141D33"
            nearColor="#080D18"
            stars
          />
        </Backdrop>
      }
    >
      <div className="middle" style={{ width: '100%' }}>
        {phase === 'letter' && (
          <div className="stack gap-16 center ep-letter">
            {copy.epilogue.lines.slice(0, lines).map((l, i) => (
              <p key={l} className={`caption ep-line ${i === lines - 1 ? 'is-last' : 'is-past'}`}>
                {l}
              </p>
            ))}
          </div>
        )}

        {phase !== 'letter' && (
          <div className="stack gap-12 center">
            <h2 className="headline ep-final">{copy.epilogue.finalLine}</h2>
            <PhotoPlate onStatus={setPhotoOk} />
            <p className="ep-sign">
              {copy.epilogue.signature} <span className="ep-heart">♥</span>
            </p>
          </div>
        )}

        {phase === 'cats-talk' && (
          <div className="ep-talk anim-in">
            {copy.epilogue.catsLines.map((c) => (
              <p key={c.who} className="ep-talk-line">
                <b>{c.who} :</b> {c.what}
              </p>
            ))}
          </div>
        )}

        {phase === 'remember' && <p className="mono-line dim ep-remember anim-in">{copy.epilogue.catsRemember}</p>}
      </div>

      {/* la famille face a la mer — effacee si la vraie photo s'affiche */}
      <div className="ep-family" hidden={photoOk && phase !== 'letter'}>
        <Chat size={78} eyes="closed" />
        <Souris size={66} eyes="closed" />
        {(phase === 'cats-talk' || phase === 'remember') && (
          <>
            <Pirate size={44} eyes="open" />
            <PeeWee size={44} eyes="half" />
          </>
        )}
      </div>

      {/* traversee des chats */}
      {phase === 'cats-cross' && (
        <div className="ep-cross" aria-hidden="true">
          <span className="ep-cross-a">
            <Pirate size={52} eyes="open" />
          </span>
          <span className="ep-cross-b">
            <PeeWee size={52} eyes="open" />
          </span>
        </div>
      )}

      <div className="stack gap-8">
        {phase === 'cats-notif' && (
          <button
            className="ep-notif"
            onClick={() => {
              sfx('message')
              setPhase('cats-talk')
            }}
          >
            <span className="ep-notif-dot" />
            {copy.epilogue.catsNotif}
          </button>
        )}
        {phase === 'cats-talk' && (
          <Cta variant="ghost" onClick={() => setPhase('remember')}>
            {copy.epilogue.catsCta}
          </Cta>
        )}
        {phase === 'remember' && (
          <Cta variant="ghost" small onClick={onReplay}>
            {copy.epilogue.replay}
          </Cta>
        )}
      </div>
    </SceneShell>
  )
}
