// Byte Buddies service worker: makes the app installable and playable offline.
const VERSION = 'v1'
const PAGES = `bb-pages-${VERSION}`
const ASSETS = `bb-assets-${VERSION}`
const PRECACHE = ['/', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => ![PAGES, ASSETS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // Pages: try the network first so updates show up, fall back to the cache when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          if (res.ok) caches.open(PAGES).then((c) => c.put(req, copy))
          return res
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/'))),
    )
    return
  }

  // Built JS/CSS, artwork, icons and fonts: serve from cache, refresh in the background.
  const sameOriginAsset =
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/.netlify/images') ||
      url.pathname.startsWith('/icons/') ||
      url.pathname.startsWith('/img/'))
  const font = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'
  if (!sameOriginAsset && !font) return

  event.respondWith(
    caches.open(ASSETS).then(async (cache) => {
      const hit = await cache.match(req)
      const network = fetch(req)
        .then((res) => {
          if (res.ok || res.type === 'opaque') cache.put(req, res.clone())
          return res
        })
        .catch(() => hit)
      return hit || network
    }),
  )
})
