import { useState } from 'react'
import type { MatchActivity } from '@/data/worlds'
import { sfx, shuffle } from '@/lib/sfx'
import Bit from '@/components/Bit'
import type { GameProps } from './types'

export default function MatchGame({ activity, theme, onMistake, onComplete }: GameProps<MatchActivity>) {
  const [rights] = useState(() => shuffle(activity.pairs.map((p) => p.right)))
  const [selected, setSelected] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [wrongRight, setWrongRight] = useState<string | null>(null)
  const [message, setMessage] = useState({ ok: true, text: activity.prompt })

  function pickLeft(i: number) {
    if (matched.includes(i)) return
    sfx.tap()
    setSelected(i)
    setWrongRight(null)
  }

  function pickRight(right: string) {
    if (selected === null) {
      setMessage({ ok: false, text: 'First tap a picture on the left!' })
      return
    }
    const pair = activity.pairs[selected]
    if (pair.right === right) {
      sfx.correct()
      const next = [...matched, selected]
      setMatched(next)
      setSelected(null)
      setMessage({ ok: true, text: `Yes! ${pair.left}: ${right.toLowerCase()}.` })
      if (next.length === activity.pairs.length) setTimeout(onComplete, 1100)
    } else {
      sfx.wrong()
      onMistake()
      setWrongRight(right)
      setMessage({ ok: false, text: 'Not quite. Try a different one!' })
    }
  }

  const matchedRights = matched.map((i) => activity.pairs[i].right)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        <div className="space-y-3">
          {activity.pairs.map((p, i) => {
            const done = matched.includes(i)
            return (
              <button
                key={p.left}
                onClick={() => pickLeft(i)}
                className={`btn-chunky flex w-full items-center gap-3 rounded-2xl border-4 px-3 py-4 text-left font-display text-lg font-bold shadow-[0_5px_0_#cbd5e1] sm:text-xl ${
                  done
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
                    : selected === i
                      ? `${theme.border} ${theme.soft} ${theme.text} scale-105`
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-3xl sm:text-4xl">{p.emoji}</span>
                {p.left}
                {done && <span className="ml-auto">✅</span>}
              </button>
            )
          })}
        </div>
        <div className="space-y-3">
          {rights.map((r) => {
            const done = matchedRights.includes(r)
            return (
              <button
                key={r}
                onClick={() => !done && pickRight(r)}
                className={`btn-chunky flex min-h-[72px] w-full items-center rounded-2xl border-4 px-3 py-3 text-left text-base font-extrabold shadow-[0_5px_0_#cbd5e1] sm:text-lg ${
                  done
                    ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
                    : wrongRight === r
                      ? 'animate-shake border-rose-300 bg-rose-50 text-rose-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {r}
              </button>
            )
          })}
        </div>
      </div>
      <Bit key={message.text} mood={message.ok ? 'happy' : 'oops'} message={message.text} size="sm" />
    </div>
  )
}
