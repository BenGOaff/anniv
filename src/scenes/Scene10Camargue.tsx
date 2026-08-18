import { useState } from 'react'
import { Backdrop, CamargueLandscape, MedMap, TopoLines } from '../art/Backdrops'
import { Chat, Souris } from '../art/Characters'
import { bonusIcons, puzzleIcons } from '../art/Icons'
import { Cta, Flash, MonoLines, SceneShell } from '../components/ui'
import { copy } from '../config/story.config'
import { useGiftDateLabel } from '../hooks/useGameProgress'
import { useStagger, useTimeout } from '../hooks/useSequence'
import { sfx } from '../lib/audio'
import type { SceneProps } from './types'

type Phase =
  | 'false-end'
  | 'signal'
  | 'locked'
  | 'puzzle'
  | 'decrypt'
  | 'destination'
  | 'date'
  | 'mission'
  | 'program'
  | 'recap'
  | 'accepted'

/* Ordre affiche (melange fixe) vs ordre chronologique attendu. */
const SHUFFLED = ['ring', 'home', 'message', 'ferry']
const SOLUTION = ['message', 'ferry', 'home', 'ring']

export function Scene10Camargue({ onDone, unlock }: SceneProps) {
  const [phase, setPhase] = useState<Phase>('false-end')
  const [picked, setPicked] = useState<string[]>([])
  const [errors, setErrors] = useState(0)
  const [shake, setShake] = useState(0)
  const [bonus, setBonus] = useState(0)
  const [flash, setFlash] = useState(0)
  const [missionStep, setMissionStep] = useState(0)

  const { isEve } = useGiftDateLabel()
  const assist = errors >= 2

  useTimeout(() => setPhase('signal'), phase === 'false-end' ? 2800 : null)
  useTimeout(() => setPhase('locked'), phase === 'signal' ? 1600 : null)

  const decryptLines = useStagger(copy.camargue.decrypting.length, 950, phase === 'decrypt', 400)
  useTimeout(
    () => setPhase('destination'),
    phase === 'decrypt' && decryptLines >= copy.camargue.decrypting.length ? 1100 : null,
  )

  const patchLines = useStagger(copy.camargue.patch.length, 750, phase === 'accepted', 700)
  useTimeout(() => onDone(), phase === 'accepted' && patchLines >= copy.camargue.patch.length ? 1900 : null)

  /* Mission : "ne rien foutre" -> correction -> "profiter" */
  useTimeout(() => setMissionStep(1), phase === 'mission' && missionStep === 0 ? 1700 : null)
  useTimeout(() => setMissionStep(2), phase === 'mission' && missionStep === 1 ? 1300 : null)
  useTimeout(() => setMissionStep(3), phase === 'mission' && missionStep === 2 ? 1200 : null)

  const tapSymbol = (id: string) => {
    if (picked.includes(id)) return
    if (id === SOLUTION[picked.length]) {
      sfx('tap')
      const next = [...picked, id]
      setPicked(next)
      if (next.length === SOLUTION.length) {
        sfx('lock')
        window.setTimeout(() => setPhase('decrypt'), 700)
      }
    } else {
      sfx('lock')
      setErrors((e) => e + 1)
      setShake((s) => s + 1)
    }
  }

  const acceptQuest = () => {
    sfx('reveal')
    setFlash((f) => f + 1)
    setPhase('accepted')
    unlock('legendaire')
  }

  /* ---------------- Faux generique ---------------- */
  if (phase === 'false-end' || phase === 'signal') {
    return (
      <SceneShell
        backdrop={
          <Backdrop>
            <rect x="0" y="0" width="375" height="812" fill="#080D18" />
            <TopoLines opacity={0.05} stroke="#A9B1BD" />
          </Backdrop>
        }
      >
        <div className="middle">
          <div className="stack gap-8 center">
            <p className="headline cm-end">{copy.camargue.falseEnd[0]}</p>
            <p className="mono-line dim">{copy.camargue.falseEnd[1]}</p>
          </div>
          {phase === 'signal' && <p className="mono-line alert cm-signal">{copy.camargue.detected}</p>}
        </div>
      </SceneShell>
    )
  }

  /* ---------------- Carte verrouillee ---------------- */
  if (phase === 'locked') {
    return (
      <SceneShell
        backdrop={
          <Backdrop>
            <MedMap />
          </Backdrop>
        }
      >
        <p className="mono-line alert">{copy.camargue.detected}</p>
        <div className="middle">
          <div className="cm-locked anim-in">
            <LockIcon />
            <p className="cm-locked-title">{copy.camargue.locked}</p>
            <span className="cm-locked-bars">
              {Array.from({ length: 18 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 70}ms` }} />
              ))}
            </span>
          </div>
        </div>
        <Cta onClick={() => setPhase('puzzle')}>{copy.camargue.ctaDecrypt}</Cta>
      </SceneShell>
    )
  }

  /* ---------------- Puzzle ---------------- */
  if (phase === 'puzzle') {
    return (
      <SceneShell
        backdrop={
          <Backdrop>
            <MedMap />
          </Backdrop>
        }
      >
        <div className="stack gap-4">
          <p className="mono-line alert">{copy.camargue.locked}</p>
          <p className="mono-line warn">{copy.camargue.puzzleInstruction}</p>
        </div>

        <div className="middle" style={{ width: '100%' }}>
          <div className={`cm-grid ${shake ? 'shake' : ''}`} key={shake}>
            {SHUFFLED.map((id) => {
              const Icon = puzzleIcons[id]
              const done = picked.includes(id)
              const isNext = assist && !done && SOLUTION[picked.length] === id
              const sym = copy.camargue.symbols.find((s) => s.id === id)
              return (
                <button
                  key={id}
                  className={`cm-sym ${done ? 'done' : ''} ${isNext ? 'hintable' : ''}`}
                  onClick={() => tapSymbol(id)}
                  disabled={done}
                >
                  <Icon size={40} />
                  <span className="cm-sym-label">{sym?.label}</span>
                  <span className="cm-sym-year">{sym?.year}</span>
                  {done && <span className="cm-sym-rank">{picked.indexOf(id) + 1}</span>}
                </button>
              )
            })}
          </div>
          {assist && <p className="hint" style={{ marginTop: 16 }}>{copy.camargue.puzzleHelp}</p>}
        </div>

        <div className="cm-slots">
          {SOLUTION.map((_, i) => (
            <span key={i} className={picked.length > i ? 'on' : ''} />
          ))}
        </div>
      </SceneShell>
    )
  }

  /* ---------------- Decryptage ---------------- */
  if (phase === 'decrypt') {
    return (
      <SceneShell
        backdrop={
          <Backdrop className="cm-zoom">
            <MedMap />
          </Backdrop>
        }
      >
        <div className="middle">
          <MonoLines lines={copy.camargue.decrypting} visible={decryptLines} tone="warn" />
        </div>
      </SceneShell>
    )
  }

  /* ---------------- Camargue et suite ---------------- */
  return (
    <SceneShell
      backdrop={
        <Backdrop>
          <CamargueLandscape />
        </Backdrop>
      }
    >
      <Flash trigger={flash} />

      {phase === 'destination' && (
        <div className="middle">
          <h2 className="headline cm-destination">{copy.camargue.destination}</h2>
          <div className="cm-rule" />
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <Cta onClick={() => setPhase('date')}>{copy.camargue.ctaDate}</Cta>
          </div>
        </div>
      )}

      {phase === 'date' && (
        <div className="middle">
          <div className="stack gap-12 center">
            {isEve && <h2 className="headline cm-tomorrow">{copy.camargue.tomorrow}</h2>}
            <div className="stack gap-4 center anim-in">
              <p className="headline cm-day">{copy.camargue.dayName}</p>
              <p className="headline cm-date">{copy.camargue.dateFull}</p>
            </div>
          </div>
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <Cta onClick={() => setPhase('mission')}>{copy.camargue.ctaWhat}</Cta>
          </div>
        </div>
      )}

      {phase === 'mission' && (
        <div className="middle">
          <div className="stack gap-8 center">
            <p className="mono-line dim">{copy.camargue.mission[0]}</p>
            <p className={`headline cm-mission ${missionStep >= 1 ? 'struck' : ''}`}>
              {copy.camargue.mission[1]}
            </p>
            {missionStep >= 1 && <p className="mono-line warn anim-in">{copy.camargue.correction}</p>}
            {missionStep >= 2 && <p className="headline cm-mission-fixed anim-in">{copy.camargue.missionFixed}</p>}
            {missionStep >= 3 && <p className="caption anim-in">{copy.camargue.missionNote}</p>}
          </div>
          <div style={{ marginTop: 'auto', width: '100%' }}>
            {missionStep >= 3 && (
              <Cta onClick={() => setPhase('program')}>{copy.camargue.ctaProgram}</Cta>
            )}
          </div>
        </div>
      )}

      {phase === 'program' && <Program index={bonus} onNext={() => {
        if (bonus + 1 >= copy.camargue.bonuses.length) {
          setPhase('recap')
        } else {
          sfx('achievement')
          setBonus(bonus + 1)
        }
      }} />}

      {phase === 'recap' && (
        <div className="middle" style={{ width: '100%' }}>
          <div className="cm-recap panel anim-in">
            <p className="cm-recap-title">{copy.camargue.recap.title}</p>
            <div className="cm-recap-rows">
              {copy.camargue.recap.rows.map(([k, v]) => (
                <div key={k} className="cm-recap-row">
                  <span>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
              <div className="cm-recap-row">
                <span>{copy.camargue.recap.departLabel}</span>
                <b className="cm-depart">{isEve ? 'DEMAIN' : copy.camargue.dateFull}</b>
              </div>
            </div>
            <div className="cm-recap-party">
              <Chat size={68} eyes="half" />
              <Souris size={58} eyes="happy" />
            </div>
          </div>
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <Cta onClick={acceptQuest}>{copy.camargue.recap.cta}</Cta>
          </div>
        </div>
      )}

      {phase === 'accepted' && (
        <div className="middle">
          <div className="cm-patch anim-in">
            <span className="cm-patch-ring">55</span>
            <MonoLines lines={copy.camargue.patch} visible={patchLines} tone="warn" />
          </div>
        </div>
      )}
    </SceneShell>
  )
}

function Program({ index, onNext }: { index: number; onNext: () => void }) {
  const list = copy.camargue.bonuses
  const item = list[index]
  const Icon = bonusIcons[item.icon]
  const total = list.length
  return (
    <div className="middle" style={{ width: '100%' }}>
      <button className="cm-bonus" onClick={onNext} key={index}>
        <span className="cm-bonus-code">
          {item.code} // {index + 1}/{total}
        </span>
        <span className="cm-bonus-icon">
          <Icon size={52} />
        </span>
        <span className="cm-bonus-title">{item.title}</span>
        {item.desc && <span className="cm-bonus-desc">{item.desc}</span>}
        <span className="cm-bonus-stat">{item.stat}</span>
      </button>

      <div className="cm-bonus-track">
        {list.map((b, i) => {
          const MiniIcon = bonusIcons[b.icon]
          return (
            <span key={b.code} className={i <= index ? 'on' : ''}>
              {i <= index ? <MiniIcon size={16} color="#55D6E8" /> : <i />}
            </span>
          )
        })}
      </div>

      <p className="hint" style={{ marginTop: 10 }}>
        {copy.camargue.programHint}
      </p>
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#E63E48" strokeWidth="1.8">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.6" fill="#E63E48" stroke="none" />
    </svg>
  )
}
