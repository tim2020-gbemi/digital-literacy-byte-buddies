import { useEffect } from 'react'

// Tiny Web Audio sound effects + text-to-speech helpers. No audio files needed.

let ctx: AudioContext | null = null
let muted = false

export function setMuted(value: boolean) {
  muted = value
  if (value) window.speechSynthesis?.cancel()
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine') {
  if (muted || typeof window === 'undefined') return
  ctx ??= new AudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t = ctx.currentTime + start
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + duration + 0.05)
}

export const sfx = {
  correct() {
    tone(660, 0, 0.12, 'triangle')
    tone(990, 0.1, 0.18, 'triangle')
  },
  wrong() {
    tone(220, 0, 0.18, 'square')
    tone(180, 0.12, 0.22, 'square')
  },
  tap() {
    tone(520, 0, 0.06, 'sine')
  },
  win() {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.25, 'triangle'))
  },
}

// When an intro (lesson card, game title, question) was last narrated. Feedback that
// shows up right after an intro waits its turn instead of cutting the intro off.
let introAt = 0

export function speak(text: string, { queue = false }: { queue?: boolean } = {}) {
  if (muted || typeof window === 'undefined' || !window.speechSynthesis) return
  if (!queue) window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.rate = 0.95
  u.pitch = 1.15
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
}

/** Automatically read an intro aloud. `queue` lets it follow whatever is already being said. */
export function narrate(text: string, { queue = false }: { queue?: boolean } = {}) {
  introAt = Date.now()
  speak(text, { queue })
}

/** Automatically read feedback aloud; waits behind an intro that just started, otherwise interrupts. */
export function narrateFeedback(text: string) {
  speak(text, { queue: Date.now() - introAt < 800 })
}

/**
 * Read `text` aloud whenever it changes. Deferred so that intros always start before
 * feedback, even though React runs children's effects before their parent's.
 */
export function useReadAloud(
  text: string | null | undefined,
  { intro = false, queue = false, delay = intro ? 20 : 80 }: { intro?: boolean; queue?: boolean; delay?: number } = {},
) {
  useEffect(() => {
    if (!text) return
    const t = setTimeout(() => (intro ? narrate(text, { queue }) : narrateFeedback(text)), delay)
    return () => clearTimeout(t)
  }, [text, intro, queue, delay])
}

export function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
