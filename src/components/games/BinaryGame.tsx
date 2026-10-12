import { useState } from 'react'
import type { BinaryActivity } from '@/data/worlds'
import { sfx } from '@/lib/sfx'
import Bit from '@/components/Bit'
import NextButton from './NextButton'
import type { GameProps } from './types'

const VALUES = [8, 4, 2, 1]

export default function BinaryGame({ activity, theme, onComplete }: GameProps<BinaryActivity>) {
  const [round, setRound] = useState(0)
  const [on, setOn] = useState([false, false, false, false])
  const target = activity.targets[round]
  const total = VALUES.reduce((sum, v, i) => sum + (on[i] ? v : 0), 0)
  const solved = total === target

  function toggle(i: number) {
    if (solved) return
    const next = on.map((b, j) => (j === i ? !b : b))
    setOn(next)
    const nextTotal = VALUES.reduce((sum, v, j) => sum + (next[j] ? v : 0), 0)
    if (nextTotal === target) sfx.correct()
    else sfx.tap()
  }

  function next() {
    if (round + 1 >= activity.targets.length) return onComplete()
    setRound(round + 1)
    setOn([false, false, false, false])
  }

  const message = solved
    ? `You made ${target}! In binary that is ${on.map((b) => (b ? 1 : 0)).join('')}.`
    : total > target
      ? `Too much! You have ${total}. Turn a bulb off.`
      : `Make the number ${target}. Right now you have ${total}.`

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className={`font-display text-lg font-semibold ${theme.text}`}>
          Round {round + 1} of {activity.targets.length}
        </p>
        <div key={round} className="animate-pop mx-auto mt-2 inline-flex flex-col items-center rounded-3xl bg-slate-900 px-10 py-4 text-white shadow-xl">
          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Make this number</span>
          <span className="font-display text-6xl font-bold text-amber-300">{target}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {VALUES.map((v, i) => (
          <button
            key={v}
            onClick={() => toggle(i)}
            aria-pressed={on[i]}
            className={`btn-chunky flex flex-col items-center gap-2 rounded-3xl border-4 p-3 sm:p-5 ${
              on[i]
                ? 'border-amber-300 bg-amber-100 shadow-[0_6px_0_#d97706,0_0_40px_#fcd34d]'
                : 'border-slate-300 bg-slate-100 shadow-[0_6px_0_#94a3b8]'
            }`}
          >
            <span className={`text-5xl transition sm:text-6xl ${on[i] ? '' : 'opacity-30 grayscale'}`}>💡</span>
            <span className="font-display text-2xl font-bold text-slate-700">{v}</span>
            <span
              className={`rounded-lg px-3 py-0.5 font-mono text-xl font-bold ${
                on[i] ? 'bg-amber-400 text-white' : 'bg-slate-300 text-slate-600'
              }`}
            >
              {on[i] ? 1 : 0}
            </span>
          </button>
        ))}
      </div>
      <Bit key={message} message={message} mood={total > target ? 'oops' : 'happy'} size="sm" />
      {solved && (
        <div className="text-center">
          <NextButton theme={theme} onClick={next} />
        </div>
      )}
    </div>
  )
}
