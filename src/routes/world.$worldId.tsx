import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Lock, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { getWorld, worlds, type Activity, type World } from '@/data/worlds'
import { isUnlocked, saveWorldStars, starsFor, useProgress } from '@/lib/progress'
import { sfx, speak } from '@/lib/sfx'
import { img } from '@/lib/img'
import Bit from '@/components/Bit'
import Confetti from '@/components/Confetti'
import Stars from '@/components/Stars'
import QuizGame from '@/components/games/QuizGame'
import SortGame from '@/components/games/SortGame'
import MatchGame from '@/components/games/MatchGame'
import SequenceGame from '@/components/games/SequenceGame'
import BinaryGame from '@/components/games/BinaryGame'

export const Route = createFileRoute('/world/$worldId')({
  loader: ({ params }) => {
    const world = getWorld(params.worldId)
    if (!world) throw notFound()
    return { worldId: world.id }
  },
  head: ({ loaderData }) => {
    const world = loaderData ? getWorld(loaderData.worldId) : undefined
    return { meta: [{ title: world ? `${world.name} · Byte Buddies` : 'Byte Buddies' }] }
  },
  component: WorldRoute,
})

// Key by world so moving to the next world starts fresh at its intro.
function WorldRoute() {
  const { worldId } = Route.useLoaderData()
  return <WorldPage key={worldId} />
}

type Phase = { step: 'intro' } | { step: 'learn'; i: number } | { step: 'play'; i: number } | { step: 'done' }

function WorldPage() {
  const { worldId } = Route.useLoaderData()
  const world = getWorld(worldId)!
  const progress = useProgress()
  const index = worlds.findIndex((w) => w.id === world.id)
  const unlocked = isUnlocked(worlds.map((w) => w.id), index, progress)

  const [phase, setPhase] = useState<Phase>({ step: 'intro' })
  const [mistakes, setMistakes] = useState(0)

  const totalSteps = world.lessons.length + world.activities.length
  const doneSteps =
    phase.step === 'intro' ? 0 : phase.step === 'learn' ? phase.i : phase.step === 'play' ? world.lessons.length + phase.i : totalSteps

  function finishActivity(i: number) {
    if (i + 1 < world.activities.length) {
      setPhase({ step: 'play', i: i + 1 })
    } else {
      saveWorldStars(world.id, starsFor(mistakes))
      sfx.win()
      setPhase({ step: 'done' })
    }
  }

  function restart() {
    setMistakes(0)
    setPhase({ step: 'intro' })
  }

  if (!unlocked) {
    const prev = worlds[index - 1]
    return (
      <Shell world={world}>
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
          <Lock className="mx-auto h-16 w-16 text-slate-400" />
          <h1 className="mt-4 font-display text-3xl font-bold text-slate-800">This world is still locked</h1>
          <p className="mt-2 text-lg font-bold text-slate-500">
            Finish <span className={prev.theme.text}>{prev.name}</span> first to open it!
          </p>
          <Link
            to="/world/$worldId"
            params={{ worldId: prev.id }}
            className={`btn-chunky mt-6 inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-display text-xl font-bold text-white ${prev.theme.button}`}
          >
            Go to {prev.name} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </Shell>
    )
  }

  return (
    <Shell world={world}>
      {phase.step !== 'intro' && phase.step !== 'done' && (
        <div className="mb-6 flex items-center gap-3">
          <div className="h-5 flex-1 overflow-hidden rounded-full bg-white/70 ring-2 ring-white">
            <div
              className={`h-full rounded-full ${world.theme.solid} transition-all duration-500`}
              style={{ width: `${(doneSteps / totalSteps) * 100}%` }}
            />
          </div>
          <span className="font-display text-lg font-bold text-slate-700">
            {doneSteps}/{totalSteps}
          </span>
        </div>
      )}

      {phase.step === 'intro' && <Intro world={world} onStart={() => setPhase({ step: 'learn', i: 0 })} />}

      {phase.step === 'learn' && (
        <LessonCard
          key={phase.i}
          world={world}
          i={phase.i}
          onBack={() => setPhase(phase.i === 0 ? { step: 'intro' } : { step: 'learn', i: phase.i - 1 })}
          onNext={() =>
            setPhase(phase.i + 1 < world.lessons.length ? { step: 'learn', i: phase.i + 1 } : { step: 'play', i: 0 })
          }
        />
      )}

      {phase.step === 'play' && (
        <div key={phase.i} className="animate-pop mx-auto max-w-3xl">
          <div className="mb-5 text-center">
            <span className={`inline-block rounded-full ${world.theme.soft} px-4 py-1 font-display font-bold ${world.theme.text}`}>
              Game {phase.i + 1} of {world.activities.length}
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold text-slate-800">{world.activities[phase.i].title}</h2>
            {'prompt' in world.activities[phase.i] && (
              <p className="mt-1 text-lg font-bold text-slate-600">
                {(world.activities[phase.i] as Extract<Activity, { prompt: string }>).prompt}
              </p>
            )}
          </div>
          <ActivityView
            activity={world.activities[phase.i]}
            world={world}
            onMistake={() => setMistakes((m) => m + 1)}
            onComplete={() => finishActivity(phase.i)}
          />
        </div>
      )}

      {phase.step === 'done' && <Done world={world} mistakes={mistakes} onReplay={restart} />}
    </Shell>
  )
}

function Shell({ world, children }: { world: World; children: React.ReactNode }) {
  return (
    <main className={`min-h-[calc(100vh-64px)] bg-gradient-to-b ${world.theme.gradient} px-4 pb-16 pt-6`}>
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 font-bold text-slate-700 hover:bg-white">
          <ArrowLeft className="h-4 w-4" /> World map
        </Link>
        {children}
      </div>
    </main>
  )
}

function Intro({ world, onStart }: { world: World; onStart: () => void }) {
  return (
    <div className="animate-pop grid items-center gap-8 rounded-[2rem] bg-white/90 p-6 shadow-2xl md:grid-cols-2 md:p-10">
      <img
        src={img(world.image, 640, 640)}
        alt={world.name}
        className="aspect-square w-full rounded-3xl object-cover shadow-lg"
      />
      <div>
        <span className={`inline-block rounded-full ${world.theme.soft} px-4 py-1 font-display text-lg font-bold ${world.theme.text}`}>
          World {world.number}
        </span>
        <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-slate-800">
          {world.emoji} {world.name}
        </h1>
        <p className="mt-2 text-xl font-bold text-slate-600">{world.tagline}</p>
        <ul className="mt-5 space-y-2 text-lg font-bold text-slate-600">
          <li>📖 {world.lessons.length} story cards</li>
          <li>🎮 {world.activities.length} mini-games</li>
          <li>
            🏅 Win the <span className={world.theme.text}>{world.badge.name}</span> badge
          </li>
        </ul>
        <button
          onClick={() => {
            sfx.tap()
            onStart()
          }}
          className={`btn-chunky mt-7 inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-display text-2xl font-bold text-white ${world.theme.button}`}
        >
          Let&apos;s go! <ArrowRight className="h-7 w-7" />
        </button>
      </div>
    </div>
  )
}

function LessonCard({ world, i, onBack, onNext }: { world: World; i: number; onBack: () => void; onNext: () => void }) {
  const lesson = world.lessons[i]
  const isLast = i + 1 === world.lessons.length
  return (
    <div className="animate-pop mx-auto max-w-2xl">
      <div className="rounded-[2rem] bg-white p-8 text-center shadow-2xl">
        <div className="text-8xl">{lesson.emoji}</div>
        <h2 className="mt-4 font-display text-4xl font-bold text-slate-800">{lesson.title}</h2>
        <p className="mt-4 text-xl font-bold leading-relaxed text-slate-600 sm:text-2xl">{lesson.text}</p>
        {lesson.fact && (
          <div className="mt-6 rounded-2xl border-4 border-dashed border-amber-300 bg-amber-50 p-4 text-left text-lg font-bold text-amber-800">
            <span className="mr-2">🤓</span>
            <span className="font-display">Fun fact:</span> {lesson.fact}
          </div>
        )}
        <button
          onClick={() => speak(`${lesson.title}. ${lesson.text} ${lesson.fact ? `Fun fact: ${lesson.fact}` : ''}`)}
          className={`mt-6 inline-flex items-center gap-2 rounded-full ${world.theme.soft} px-5 py-2 font-bold ${world.theme.text}`}
        >
          🔊 Read it to me
        </button>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button onClick={onBack} className="rounded-2xl bg-white/80 px-5 py-3 font-display text-lg font-bold text-slate-600 hover:bg-white">
          <ArrowLeft className="mr-1 inline h-5 w-5" /> Back
        </button>
        <button
          onClick={() => {
            sfx.tap()
            onNext()
          }}
          className={`btn-chunky inline-flex items-center gap-2 rounded-2xl px-7 py-3 font-display text-xl font-bold text-white ${world.theme.button}`}
        >
          {isLast ? 'Play the games! 🎮' : 'Next'} <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

function ActivityView({
  activity,
  world,
  onMistake,
  onComplete,
}: {
  activity: Activity
  world: World
  onMistake: () => void
  onComplete: () => void
}) {
  const props = { theme: world.theme, onMistake, onComplete }
  switch (activity.kind) {
    case 'quiz':
      return <QuizGame activity={activity} {...props} />
    case 'sort':
      return <SortGame activity={activity} {...props} />
    case 'match':
      return <MatchGame activity={activity} {...props} />
    case 'sequence':
      return <SequenceGame activity={activity} {...props} />
    case 'binary':
      return <BinaryGame activity={activity} {...props} />
  }
}

function Done({ world, mistakes, onReplay }: { world: World; mistakes: number; onReplay: () => void }) {
  const stars = starsFor(mistakes)
  const next = worlds[world.number]
  const cheer = stars === 3 ? 'PERFECT! You did not miss a single one!' : stars === 2 ? 'Awesome work, explorer!' : 'You did it! Play again to win more stars.'
  return (
    <div className="mx-auto max-w-xl">
      <Confetti />
      <div className="animate-pop rounded-[2rem] bg-white p-8 text-center shadow-2xl">
        <p className={`font-display text-xl font-bold ${world.theme.text}`}>World complete!</p>
        <div className="mx-auto mt-4 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-400 text-7xl shadow-[0_8px_0_#d97706] ring-8 ring-amber-100">
          {world.badge.emoji}
        </div>
        <h2 className="mt-5 font-display text-4xl font-bold text-slate-800">{world.badge.name}</h2>
        <p className="mt-1 text-lg font-bold text-slate-500">New badge unlocked!</p>
        <div className="mt-4 flex justify-center">
          <Stars count={stars} size="h-12 w-12" />
        </div>
        <div className="mt-6 text-left">
          <Bit message={cheer} size="sm" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={onReplay} className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-display text-lg font-bold text-slate-600 hover:bg-slate-200">
            <RotateCcw className="h-5 w-5" /> Play again
          </button>
          {next ? (
            <Link
              to="/world/$worldId"
              params={{ worldId: next.id }}
              className={`btn-chunky inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-display text-lg font-bold text-white ${next.theme.button}`}
            >
              Next: {next.name} <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              to="/"
              className="btn-chunky inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-3 font-display text-lg font-bold text-white shadow-[0_6px_0_#b45309]"
            >
              See all my badges 🏆
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
