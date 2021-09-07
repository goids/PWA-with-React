/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app

self.__precacheManifest = [].concat( self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute('/index.html')
//manejar todas las URLs por defecto
// por defectos la rutas que hagamos van a lidiar on rutas de nuestro domino, tambien podemos
// trabajar con rutas externas workbox lo permite, pero tenemos que aclararle especificamente
// cuando tenga que trabajar con recursos fuera de nuestro dominio 

// Google Anlitycs Offline
workbox.googleAnalytics.initialize()

// URL externa
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, workbox.strategies.staleWhileRevalidate(), 'GET')

// Cacheando las fuentes
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/, workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
        new workbox.expiration.Plugin({
            maxAgeSeconds: 30 * 24 * 60 * 60
        })
    ]
}), 'GET')

// Cacheando las imagenes
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/images\/media\/meals\/.*/, workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
        new workbox.expiration.Plugin({
            maxAgeSeconds: 7 * 24 * 60 * 60
        })
    ]
}))

// URL interna
workbox.routing.registerRoute(/^https?.*/, workbox.strategies.networkFirst(), 'GET')