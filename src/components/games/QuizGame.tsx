import { useState } from 'react'
import type { QuizActivity } from '@/data/worlds'
import { sfx } from '@/lib/sfx'
import Bit from '@/components/Bit'
import NextButton from './NextButton'
import type { GameProps } from './types'

export default function QuizGame({ activity, theme, onMistake, onComplete }: GameProps<QuizActivity>) {
  const [index, setIndex] = useState(0)
  const [wrong, setWrong] = useState<number[]>([])
  const [solved, setSolved] = useState(false)
  const q = activity.questions[index]

  function pick(i: number) {
    if (solved || wrong.includes(i)) return
    if (i === q.answer) {
      sfx.correct()
      setSolved(true)
    } else {
      sfx.wrong()
      onMistake()
      setWrong([...wrong, i])
    }
  }

  function next() {
    if (index + 1 >= activity.questions.length) return onComplete()
    setIndex(index + 1)
    setWrong([])
    setSolved(false)
  }

  return (
    <div className="space-y-6">
      <p className={`text-center font-display text-lg font-semibold ${theme.text}`}>
        Question {index + 1} of {activity.questions.length}
      </p>
      <div key={index} className="animate-pop rounded-3xl bg-white p-6 text-center shadow-lg">
        {q.emoji && <div className="mb-2 text-6xl">{q.emoji}</div>}
        <h3 className="font-display text-2xl font-bold text-slate-800 sm:text-3xl">{q.prompt}</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {q.options.map((o, i) => {
          const isRight = solved && i === q.answer
          const isWrong = wrong.includes(i)
          return (
            <button
              key={`${index}-${i}`}
              onClick={() => pick(i)}
              className={`btn-chunky flex items-center justify-center gap-3 rounded-2xl border-4 px-4 py-5 text-xl font-extrabold shadow-[0_6px_0_#cbd5e1] ${
                isRight
                  ? 'animate-pop border-emerald-400 bg-emerald-100 text-emerald-800'
                  : isWrong
                    ? 'animate-shake border-rose-300 bg-rose-50 text-rose-400 line-through'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              {o.emoji && <span className="text-3xl">{o.emoji}</span>}
              <span>{o.label}</span>
            </button>
          )
        })}
      </div>
      {solved ? (
        <div className="space-y-4">
          <Bit message={`Yes! ${q.explain}`} />
          <div className="text-center">
            <NextButton theme={theme} onClick={next} />
          </div>
        </div>
      ) : wrong.length > 0 ? (
        <Bit mood="oops" message="Oops, not that one. Try again!" />
      ) : null}
    </div>
  )
}
