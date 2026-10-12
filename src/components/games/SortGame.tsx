import { useState } from 'react'
import type { SortActivity } from '@/data/worlds'
import { sfx, shuffle } from '@/lib/sfx'
import Bit from '@/components/Bit'
import type { GameProps } from './types'

export default function SortGame({ activity, theme, onMistake, onComplete }: GameProps<SortActivity>) {
  const [items] = useState(() => shuffle(activity.items))
  const [index, setIndex] = useState(0)
  const [sorted, setSorted] = useState<[string[], string[]]>([[], []])
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null)
  const [shakeKey, setShakeKey] = useState(0)
  const item = items[index]

  function choose(bin: 0 | 1) {
    if (!item) return
    if (bin === item.bin) {
      sfx.correct()
      const next: [string[], string[]] = [[...sorted[0]], [...sorted[1]]]
      next[bin].push(item.emoji)
      setSorted(next)
      setFeedback({ ok: true, text: item.explain ?? `Great job! ${item.label} goes in "${activity.bins[bin].label}".` })
      if (index + 1 >= items.length) setTimeout(onComplete, 1200)
      setIndex(index + 1)
    } else {
      sfx.wrong()
      onMistake()
      setShakeKey(shakeKey + 1)
      setFeedback({ ok: false, text: `Hmm, think again! Where does ${item.label.toLowerCase()} belong?` })
    }
  }

  return (
    <div className="space-y-6">
      <p className={`text-center font-display text-lg font-semibold ${theme.text}`}>
        {Math.min(index + 1, items.length)} of {items.length}
      </p>
      <div className="flex min-h-48 items-center justify-center">
        {item ? (
          <div
            key={`${index}-${shakeKey}`}
            className={`${shakeKey && feedback && !feedback.ok ? 'animate-shake' : 'animate-pop'} w-full max-w-sm rounded-3xl border-4 ${theme.border} bg-white p-6 text-center shadow-xl`}
          >
            <div className="text-7xl">{item.emoji}</div>
            <div className="mt-2 font-display text-2xl font-bold text-slate-800">{item.label}</div>
          </div>
        ) : (
          <div className="animate-pop text-7xl">🎉</div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {activity.bins.map((b, i) => (
          <button
            key={b.label}
            onClick={() => choose(i as 0 | 1)}
            disabled={!item}
            className={`btn-chunky flex min-h-36 flex-col items-center justify-start gap-1 rounded-3xl border-4 border-dashed p-4 shadow-[0_6px_0_#cbd5e1] ${
              i === 0 ? 'border-sky-300 bg-sky-50 hover:bg-sky-100' : 'border-amber-300 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            <span className="text-4xl">{b.emoji}</span>
            <span className="font-display text-xl font-bold text-slate-700 sm:text-2xl">{b.label}</span>
            <span className="flex flex-wrap justify-center gap-1 text-2xl">
              {sorted[i].map((e, j) => (
                <span key={j} className="animate-pop">{e}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
      {feedback && <Bit key={feedback.text} mood={feedback.ok ? 'happy' : 'oops'} message={feedback.text} size="sm" />}
    </div>
  )
}
