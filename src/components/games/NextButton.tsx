import { ArrowRight } from 'lucide-react'
import type { WorldTheme } from '@/data/worlds'

export default function NextButton({
  theme,
  onClick,
  label = 'Next',
}: {
  theme: WorldTheme
  onClick: () => void
  label?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`btn-chunky animate-pop inline-flex items-center gap-2 rounded-2xl px-7 py-3 font-display text-xl font-bold text-white ${theme.button}`}
    >
      {label} <ArrowRight className="h-6 w-6" />
    </button>
  )
}
