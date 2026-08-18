/* Service worker minimal : le jeu reste jouable meme avec un reseau mauvais.
   Strategie : reseau d'abord, cache en secours. Aucune logique complexe,
   pour ne rien casser sur Safari iOS. */

const CACHE = 'cs55-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(Promise.resolve())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  if (new URL(req.url).origin !== self.location.origin) return

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone()
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {})
        return res
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || caches.match('./index.html').then((i) => i || Response.error())),
      ),
  )
})
