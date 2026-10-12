import { Volume2 } from 'lucide-react'
import { img } from '@/lib/img'
import { speak } from '@/lib/sfx'

type Props = {
  message: string
  mood?: 'happy' | 'oops'
  size?: 'sm' | 'md'
}

/** Bit the robot guide, with a speech bubble and a "read to me" button. */
export default function Bit({ message, mood = 'happy', size = 'md' }: Props) {
  const dim = size === 'sm' ? 'h-16 w-16' : 'h-24 w-24'
  return (
    <div className="flex items-end gap-3">
      <img
        src={img('bit-mascot', 200, 200)}
        alt="Bit the robot"
        className={`${dim} shrink-0 rounded-full bg-[#f7eedd] object-cover ring-4 ring-white shadow-lg ${
          mood === 'oops' ? 'animate-shake' : 'animate-float'
        }`}
      />
      <div
        className={`relative mb-2 flex-1 rounded-3xl rounded-bl-md border-4 bg-white px-4 py-3 text-lg font-bold shadow-md ${
          mood === 'oops' ? 'border-orange-300 text-orange-700' : 'border-sky-200 text-slate-700'
        }`}
      >
        <p className="pr-8">{message}</p>
        <button
          onClick={() => speak(message)}
          className="absolute right-2 top-2 rounded-full p-1.5 text-sky-500 hover:bg-sky-50"
          aria-label="Read this to me"
          title="Read to me"
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
