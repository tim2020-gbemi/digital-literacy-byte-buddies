import { useState } from 'react'
import type { SequenceActivity } from '@/data/worlds'
import { sfx, shuffle } from '@/lib/sfx'
import Bit from '@/components/Bit'
import type { GameProps } from './types'

export default function SequenceGame({ activity, theme, onMistake, onComplete }: GameProps<SequenceActivity>) {
  const [pool] = useState(() => shuffle(activity.steps.map((_, i) => i)))
  const [placed, setPlaced] = useState<number[]>([])
  const [wrong, setWrong] = useState<number | null>(null)
  const [message, setMessage] = useState({ ok: true, text: 'Which step comes first?' })

  function pick(stepIndex: number) {
    if (placed.includes(stepIndex)) return
    if (stepIndex === placed.length) {
      sfx.correct()
      const next = [...placed, stepIndex]
      setPlaced(next)
      setWrong(null)
      if (next.length === activity.steps.length) {
        setMessage({ ok: true, text: 'Perfect order! You are a computer whiz!' })
        setTimeout(onComplete, 1200)
      } else {
        setMessage({ ok: true, text: 'Yes! What happens next?' })
      }
    } else {
      sfx.wrong()
      onMistake()
      setWrong(stepIndex)
      setMessage({ ok: false, text: 'Not yet! Something else happens before that.' })
    }
  }

  return (
    <div className="space-y-6">
      <ol className="space-y-2">
        {activity.steps.map((s, i) => {
          const filled = i < placed.length
          return (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-2xl border-4 px-4 py-3 ${
                filled ? `${theme.border} bg-white shadow-md` : 'border-dashed border-slate-300 bg-white/50'
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold text-white ${
                  filled ? theme.solid : 'bg-slate-300'
                }`}
              >
                {i + 1}
              </span>
              {filled ? (
                <span className="animate-pop flex items-center gap-2 text-lg font-extrabold text-slate-700">
                  <span className="text-3xl">{s.emoji}</span> {s.label}
                </span>
              ) : (
                <span className="text-lg font-bold text-slate-400">?</span>
              )}
            </li>
          )
        })}
      </ol>
      <div className="flex flex-wrap justify-center gap-3">
        {pool
          .filter((i) => !placed.includes(i))
          .map((i) => (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`btn-chunky flex items-center gap-2 rounded-2xl border-4 bg-white px-4 py-3 text-lg font-extrabold text-slate-700 shadow-[0_5px_0_#cbd5e1] hover:bg-slate-50 ${
                wrong === i ? 'animate-shake border-rose-300' : 'border-slate-200'
              }`}
            >
              <span className="text-2xl">{activity.steps[i].emoji}</span>
              {activity.steps[i].label}
            </button>
          ))}
      </div>
      <Bit key={message.text} mood={message.ok ? 'happy' : 'oops'} message={message.text} size="sm" />
    </div>
  )
}
