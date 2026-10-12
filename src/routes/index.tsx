import { Link, createFileRoute } from '@tanstack/react-router'
import { Lock, Play, RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { worlds } from '@/data/worlds'
import { isUnlocked, resetProgress, setPlayer, useProgress } from '@/lib/progress'
import { sfx } from '@/lib/sfx'
import { img } from '@/lib/img'
import Stars from '@/components/Stars'

export const Route = createFileRoute('/')({
  component: Home,
})

const AVATARS = ['🦊', '🐼', '🦄', '🐸', '🐯', '🐙', '🦖', '🐧']
const WORLD_IDS = worlds.map((w) => w.id)

function Home() {
  const progress = useProgress()
  const nextIndex = worlds.findIndex((w) => !progress.worlds[w.id])
  const current = worlds[nextIndex === -1 ? 0 : nextIndex]
  const badges = worlds.filter((w) => (progress.worlds[w.id]?.stars ?? 0) > 0)

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-[#fff8ec]">
        <Sky />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-10 md:grid-cols-[1.1fr_1fr] md:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 font-display font-bold text-sky-700 shadow">
              <Sparkles className="h-4 w-4" /> For explorers ages 5–10
            </span>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-slate-800 sm:text-6xl lg:text-7xl">
              {progress.name ? (
                <>
                  Welcome back,
                  <br />
                  <span className="text-sky-600">
                    {progress.name} {progress.avatar}
                  </span>
                </>
              ) : (
                <>
                  Discover the magic
                  <br />
                  <span className="text-sky-600">inside computers!</span>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-xl text-xl font-bold text-slate-600">
              Join Bit the robot on an adventure through 5 worlds. Learn what a computer is, how it thinks, what it can do, and how to stay safe online.
            </p>
            {progress.name ? (
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/world/$worldId"
                  params={{ worldId: current.id }}
                  className={`btn-chunky inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-display text-2xl font-bold text-white ${current.theme.button}`}
                >
                  <Play className="h-6 w-6 fill-white" />
                  {nextIndex === -1 ? 'Play again' : badges.length ? 'Keep exploring' : 'Start adventure'}
                </Link>
                <a href="#map" className="rounded-2xl bg-white/80 px-6 py-4 font-display text-xl font-bold text-slate-700 hover:bg-white">
                  See world map
                </a>
              </div>
            ) : (
              <NameCard />
            )}
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-white/60 blur-2xl" />
            <img
              src={img('bit-mascot', 720, 720)}
              alt="Bit, a friendly blue robot, waving hello"
              className="animate-float relative aspect-square w-full rounded-[3rem] bg-[#f7eedd] object-cover shadow-2xl ring-8 ring-white"
            />
            <div className="absolute -left-4 top-6 rotate-[-6deg] rounded-2xl bg-white px-4 py-2 font-display text-lg font-bold text-slate-700 shadow-lg">
              Hi, I&apos;m Bit! 👋
            </div>
            <div className="absolute -right-2 bottom-10 rotate-[5deg] rounded-2xl bg-amber-300 px-4 py-2 font-mono text-lg font-bold text-amber-900 shadow-lg">
              01001000 01101001
            </div>
          </div>
        </div>
      </section>

      {/* World map */}
      <section id="map" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-slate-800 sm:text-5xl">The World Map</h2>
          <p className="mt-2 text-lg font-bold text-slate-500">Finish a world to unlock the next one. Can you collect all 15 stars?</p>
        </div>
        <ol className="relative mt-10 space-y-8">
          <div className="absolute bottom-10 left-1/2 top-10 hidden w-2 -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(to_bottom,#cbd5e1_0_14px,transparent_14px_28px)] md:block" />
          {worlds.map((w, i) => {
            const unlocked = isUnlocked(WORLD_IDS, i, progress)
            const stars = progress.worlds[w.id]?.stars ?? 0
            const isCurrent = w.id === current.id && unlocked && nextIndex !== -1
            return (
              <li key={w.id} className={`relative flex md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-10' : 'md:pr-10'}`}>
                <Link
                  to="/world/$worldId"
                  params={{ worldId: w.id }}
                  onClick={() => sfx.tap()}
                  className={`group flex w-full items-center gap-4 rounded-[2rem] border-4 bg-white p-4 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                    isCurrent ? `${w.theme.border} ring-8 ring-amber-200` : 'border-white'
                  } ${unlocked ? '' : 'opacity-75 saturate-50'}`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={img(w.image, 240, 240)}
                      alt=""
                      loading="lazy"
                      className="h-28 w-28 rounded-3xl object-cover sm:h-32 sm:w-32"
                    />
                    {!unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-900/50">
                        <Lock className="h-10 w-10 text-white" />
                      </div>
                    )}
                    <span className={`absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full ${w.theme.solid} font-display text-xl font-bold text-white ring-4 ring-white`}>
                      {w.number}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl font-bold text-slate-800">
                      {w.emoji} {w.name}
                    </h3>
                    <p className="font-bold text-slate-500">{w.tagline}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <Stars count={stars} />
                      {isCurrent && (
                        <span className="animate-pulse rounded-full bg-amber-300 px-3 py-0.5 font-display text-sm font-bold text-amber-900">
                          Play next!
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Badge shelf */}
      <section className="bg-amber-50 px-4 py-14">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-4xl font-bold text-slate-800">🏆 My Badge Shelf</h2>
          <p className="mt-2 text-lg font-bold text-slate-500">
            {badges.length === 0
              ? 'Your shelf is empty, for now! Finish a world to win your first badge.'
              : `You have ${badges.length} of ${worlds.length} badges. ${badges.length === worlds.length ? 'You are a true Digital Hero!' : 'Keep going!'}`}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {worlds.map((w) => {
              const earned = (progress.worlds[w.id]?.stars ?? 0) > 0
              return (
                <div key={w.id} className="flex flex-col items-center rounded-3xl bg-white p-5 shadow-md">
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-full text-5xl ${
                      earned
                        ? 'bg-gradient-to-br from-amber-200 to-amber-400 shadow-[0_6px_0_#d97706]'
                        : 'bg-slate-100 grayscale opacity-40'
                    }`}
                  >
                    {earned ? w.badge.emoji : '❔'}
                  </div>
                  <p className={`mt-3 font-display text-lg font-bold ${earned ? 'text-slate-800' : 'text-slate-400'}`}>
                    {earned ? w.badge.name : 'Locked badge'}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* For grown-ups */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-[2rem] bg-slate-800 p-8 text-white md:p-12">
          <h2 className="font-display text-3xl font-bold">For parents & teachers 👩‍🏫</h2>
          <p className="mt-2 max-w-3xl text-lg text-slate-300">
            Byte Buddies turns early digital literacy into short, playful lessons. Each world takes about 5–10 minutes, uses big tap-friendly
            buttons, and has a “read it to me” button for early readers. There are no ads, no chat, and no sign-up. Progress is saved only on
            this device.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {worlds.map((w) => (
              <div key={w.id} className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl">{w.emoji}</div>
                <p className="mt-2 font-display text-lg font-bold">{w.name}</p>
                <p className="text-sm text-slate-300">{w.lessons.map((l) => l.title).join(' · ')}</p>
              </div>
            ))}
          </div>
          {progress.name && (
            <button
              onClick={() => {
                if (window.confirm('Start over? This clears the name, stars and badges on this device.')) resetProgress()
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 font-bold text-slate-200 hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" /> Start over with a new player
            </button>
          )}
        </div>
      </section>

      <footer className="pb-10 text-center font-bold text-slate-400">Made with 💙 for curious young minds · Byte Buddies</footer>
    </main>
  )
}

function NameCard() {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(AVATARS[0])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!name.trim()) return
        sfx.win()
        setPlayer(name.trim().slice(0, 20), avatar)
      }}
      className="mt-7 max-w-xl rounded-3xl bg-white p-5 shadow-xl"
    >
      <label htmlFor="player-name" className="font-display text-xl font-bold text-slate-700">
        What&apos;s your explorer name?
      </label>
      <input
        id="player-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your first name"
        maxLength={20}
        autoComplete="off"
        className="mt-2 w-full rounded-2xl border-4 border-sky-200 px-4 py-3 text-xl font-bold outline-none focus:border-sky-400"
      />
      <p className="mt-4 font-display text-lg font-bold text-slate-700">Pick your buddy:</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {AVATARS.map((a) => (
          <button
            type="button"
            key={a}
            onClick={() => {
              sfx.tap()
              setAvatar(a)
            }}
            aria-pressed={avatar === a}
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition ${
              avatar === a ? 'scale-110 bg-sky-100 ring-4 ring-sky-400' : 'bg-slate-100 hover:bg-slate-200'
            }`}
          >
            {a}
          </button>
        ))}
      </div>
      <button
        type="submit"
        disabled={!name.trim()}
        className="btn-chunky mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-4 font-display text-2xl font-bold text-white shadow-[0_6px_0_#b45309] disabled:opacity-50"
      >
        <Play className="h-6 w-6 fill-white" /> Start my adventure
      </button>
    </form>
  )
}

function Sky() {
  const dots = [
    [8, 18], [22, 8], [40, 14], [62, 6], [78, 20], [90, 10], [15, 40], [85, 45],
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-10 top-16 h-20 w-56 rounded-full bg-white/70 blur-sm" />
      <div className="absolute right-10 top-28 h-16 w-44 rounded-full bg-white/60 blur-sm" />
      <div className="absolute bottom-24 left-1/3 h-14 w-40 rounded-full bg-white/50 blur-sm" />
      {dots.map(([x, y], i) => (
        <span
          key={i}
          className="animate-twinkle absolute text-xl text-amber-300"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.3}s` }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}
