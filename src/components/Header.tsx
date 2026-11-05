import { Link } from '@tanstack/react-router'
import { Download, Star, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useProgress } from '@/lib/progress'
import { setMuted } from '@/lib/sfx'
import { worlds } from '@/data/worlds'
import { img } from '@/lib/img'

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

/** Captures the browser's "install app" prompt so we can offer our own button. */
function useInstallPrompt() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null)
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setPrompt(e as InstallPrompt)
    }
    const onInstalled = () => setPrompt(null)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])
  async function install() {
    if (!prompt) return
    await prompt.prompt()
    await prompt.userChoice
    setPrompt(null)
  }
  return { canInstall: !!prompt, install }
}

export default function Header() {
  const { canInstall, install } = useInstallPrompt()
  const progress = useProgress()
  const [muted, setMutedState] = useState(false)
  const stars = Object.values(progress.worlds).reduce((n, w) => n + w.stars, 0)

  function toggleSound() {
    setMuted(!muted)
    setMutedState(!muted)
  }

  return (
    <header className="sticky top-0 z-40 border-b-4 border-sky-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={img('bit-mascot', 96, 96)}
            alt=""
            className="h-11 w-11 rounded-2xl bg-[#f7eedd] object-cover ring-2 ring-sky-300"
          />
          <span className="font-display text-2xl font-bold tracking-tight text-sky-600">
            Byte<span className="text-amber-500">Buddies</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 font-display text-lg font-bold text-amber-700"
            title="Stars collected"
          >
            <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
            {stars}
            <span className="text-sm text-amber-500">/{worlds.length * 3}</span>
          </div>
          {progress.name && (
            <div className="hidden items-center gap-1 rounded-full bg-sky-100 px-3 py-1.5 font-bold text-sky-700 sm:flex">
              <span className="text-xl">{progress.avatar}</span>
              {progress.name}
            </div>
          )}
          {canInstall && (
            <button
              onClick={install}
              className="flex items-center gap-1 rounded-full bg-sky-500 px-3 py-1.5 font-display font-bold text-white hover:bg-sky-400"
              title="Add Byte Buddies to your home screen"
            >
              <Download className="h-5 w-5" />
              <span className="hidden sm:inline">Install</span>
            </button>
          )}
          <button
            onClick={toggleSound}
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
            aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}
