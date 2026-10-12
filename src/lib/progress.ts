import { useSyncExternalStore } from 'react'

// Player progress is kept on this device only (no accounts), so kids can
// play instantly without sign-up. Swap this module for a server-backed
// store if accounts are ever added.

export type Progress = {
  name: string
  avatar: string
  worlds: Record<string, { stars: number }>
}

const KEY = 'byte-buddies-progress-v1'
const EMPTY: Progress = { name: '', avatar: '', worlds: {} }

let cache: Progress | null = null
const listeners = new Set<() => void>()

function read(): Progress {
  if (cache) return cache
  try {
    const raw = window.localStorage.getItem(KEY)
    cache = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    cache = EMPTY
  }
  return cache!
}

function write(next: Progress) {
  cache = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // storage may be unavailable (private mode); keep in-session state
  }
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useProgress() {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export function setPlayer(name: string, avatar: string) {
  write({ ...read(), name, avatar })
}

export function saveWorldStars(worldId: string, stars: number) {
  const p = read()
  const best = Math.max(stars, p.worlds[worldId]?.stars ?? 0)
  write({ ...p, worlds: { ...p.worlds, [worldId]: { stars: best } } })
}

export function resetProgress() {
  write(EMPTY)
}

export function starsFor(mistakes: number) {
  if (mistakes === 0) return 3
  if (mistakes <= 3) return 2
  return 1
}

export function isUnlocked(worldIds: string[], index: number, progress: Progress) {
  return index === 0 || (progress.worlds[worldIds[index - 1]]?.stars ?? 0) > 0
}
