import { Star } from 'lucide-react'

export default function Stars({ count, size = 'h-6 w-6' }: { count: number; size?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <Star
          key={i}
          className={`${size} ${i < count ? 'fill-amber-400 text-amber-500' : 'fill-slate-200 text-slate-300'}`}
        />
      ))}
    </div>
  )
}
