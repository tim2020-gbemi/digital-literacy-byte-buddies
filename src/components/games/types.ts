import type { WorldTheme } from '@/data/worlds'

export type GameProps<A> = {
  activity: A
  theme: WorldTheme
  onMistake: () => void
  onComplete: () => void
}
