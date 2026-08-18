/* ============================================================
   Audio — entierement synthetise (WebAudio).
   Aucun fichier audio, aucun contenu protege, 0 octet de plus
   dans le bundle. Coupe par defaut : le jeu doit etre parfait
   en silence (decouverte au restaurant).
   ============================================================ */

type Sfx =
  | 'tap'
  | 'message'
  | 'phone'
  | 'achievement'
  | 'map'
  | 'water'
  | 'reveal'
  | 'lock'
  | 'heart'

let ctx: AudioContext | null = null
let master: GainNode | null = null
let enabled = false
let ambienceNode: { stop: () => void } | null = null

function ensure(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return null
      ctx = new Ctor()
      master = ctx.createGain()
      master.gain.value = 0.5
      master.connect(ctx.destination)
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

export function setAudioEnabled(on: boolean) {
  enabled = on
  if (on) ensure()
  else stopAmbience()
  if (master) master.gain.value = on ? 0.5 : 0
}

export function isAudioEnabled() {
  return enabled
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType = 'sine',
  gain = 0.18,
  at = 0,
  glideTo?: number,
) {
  const c = ensure()
  if (!c || !master || !enabled) return
  const t0 = c.currentTime + at
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g).connect(master)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

function noiseBurst(dur: number, freq: number, q: number, gain = 0.1, at = 0) {
  const c = ensure()
  if (!c || !master || !enabled) return
  const t0 = c.currentTime + at
  const frames = Math.floor(c.sampleRate * dur)
  const buf = c.createBuffer(1, frames, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buf
  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = freq
  filter.Q.value = q
  const g = c.createGain()
  g.gain.setValueAtTime(gain, t0)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(filter).connect(g).connect(master)
  src.start(t0)
}

export function sfx(name: Sfx) {
  if (!enabled) return
  switch (name) {
    case 'tap':
      tone(660, 0.06, 'triangle', 0.09)
      break
    case 'message':
      tone(880, 0.07, 'square', 0.06)
      tone(1320, 0.09, 'square', 0.045, 0.07)
      break
    case 'phone':
      tone(520, 0.14, 'sine', 0.12)
      tone(660, 0.14, 'sine', 0.12, 0.18)
      tone(520, 0.14, 'sine', 0.1, 0.36)
      break
    case 'achievement':
      tone(523.25, 0.1, 'triangle', 0.12)
      tone(659.25, 0.12, 'triangle', 0.12, 0.09)
      tone(783.99, 0.28, 'triangle', 0.13, 0.19)
      break
    case 'map':
      noiseBurst(0.24, 1800, 1.2, 0.055)
      tone(300, 0.16, 'sine', 0.06, 0.02, 460)
      break
    case 'water':
      noiseBurst(0.4, 700, 0.7, 0.07)
      break
    case 'lock':
      tone(180, 0.1, 'square', 0.08)
      tone(120, 0.16, 'square', 0.07, 0.1)
      break
    case 'reveal':
      tone(196, 0.9, 'sine', 0.1, 0, 392)
      tone(293.66, 0.8, 'triangle', 0.07, 0.12)
      tone(440, 0.9, 'sine', 0.06, 0.24)
      noiseBurst(0.7, 2600, 0.6, 0.035, 0.02)
      break
    case 'heart':
      tone(146.83, 0.22, 'sine', 0.1)
      tone(146.83, 0.22, 'sine', 0.08, 0.3)
      break
  }
}

/** Ambiance mer/vent : bruit filtre + LFO tres lent. */
export function startAmbience() {
  const c = ensure()
  if (!c || !master || !enabled || ambienceNode) return
  const frames = c.sampleRate * 3
  const buf = c.createBuffer(1, frames, c.sampleRate)
  const data = buf.getChannelData(0)
  let lastOut = 0
  for (let i = 0; i < frames; i++) {
    const white = Math.random() * 2 - 1
    lastOut = (lastOut + 0.02 * white) / 1.02
    data[i] = lastOut * 3.5
  }
  const src = c.createBufferSource()
  src.buffer = buf
  src.loop = true
  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 620
  const g = c.createGain()
  g.gain.value = 0.06
  const lfo = c.createOscillator()
  lfo.frequency.value = 0.09
  const lfoGain = c.createGain()
  lfoGain.gain.value = 0.035
  lfo.connect(lfoGain).connect(g.gain)
  src.connect(filter).connect(g).connect(master)
  src.start()
  lfo.start()
  ambienceNode = {
    stop: () => {
      try {
        src.stop()
        lfo.stop()
      } catch {
        /* ignore */
      }
    },
  }
}

export function stopAmbience() {
  ambienceNode?.stop()
  ambienceNode = null
}
