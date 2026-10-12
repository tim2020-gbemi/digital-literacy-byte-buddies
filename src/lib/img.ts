// Serve generated artwork through the Netlify Image CDN (resized + webp).
export function img(name: string, w: number, h?: number) {
  const params = new URLSearchParams({ url: `/img/${name}.png`, w: String(w), fm: 'webp' })
  if (h) {
    params.set('h', String(h))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params.toString()}`
}
