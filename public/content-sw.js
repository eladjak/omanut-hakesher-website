/**
 * Service worker for the /content PWA.
 *
 * Goals:
 *   1. Make the app installable as a standalone PWA on Android/iOS.
 *   2. Offline-first reads — cache the latest /api/content list and detail
 *      responses so Elad can review drafts without network.
 *   3. NEVER cache POST /action — those must always hit the server.
 *
 * Strategy:
 *   - Cache shell HTML for /content and /content/* navigations
 *     (network-first, fall back to cache).
 *   - Cache /api/content GETs (stale-while-revalidate).
 *   - Bypass everything else (let the browser handle).
 */
const CACHE_NAME = "content-pwa-v1";
const SHELL_URLS = ["/content"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        await cache.addAll(SHELL_URLS);
      } catch {
        /* offline at install time is fine */
      }
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)),
      );
      self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only handle GETs from same origin
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Only /content + /api/content
  const isShell =
    url.pathname === "/content" || url.pathname.startsWith("/content/");
  const isApi = url.pathname.startsWith("/api/content");
  if (!isShell && !isApi) return;
  // Don't cache the manifest (cache it via Cache-Control header instead)
  if (url.pathname.endsWith("/manifest.webmanifest")) return;
  // Don't cache the service worker itself
  if (url.pathname === "/content-sw.js") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      const fetchPromise = fetch(req)
        .then((resp) => {
          if (resp && resp.ok) {
            // Don't cache 4xx/5xx
            cache.put(req, resp.clone()).catch(() => {});
          }
          return resp;
        })
        .catch(() => cached || Response.error());
      // Network-first for shell, stale-while-revalidate for API
      if (isShell) return (await fetchPromise) || cached;
      return cached || fetchPromise;
    })(),
  );
});
