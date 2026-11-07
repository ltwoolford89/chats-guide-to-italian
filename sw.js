const CACHE = 'chats-italian-app-v3.0.0';
const ASSETS = ['./', './index.html', './styles.css', './app.js', './advanced-data.js', './advanced-ui.js', './manifest.webmanifest', './assets/icon-192.png', './assets/icon-512.png', './assets/icon-180.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(response => {const clone=response.clone(); caches.open(CACHE).then(c=>c.put('./',clone)); return response;}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
    if (response.ok) { const clone = response.clone(); caches.open(CACHE).then(c=>c.put(req, clone)); }
    return response;
  })));
});

// Background notifications are opt-in and require a separately configured push service.
self.addEventListener('push', event => {
 let data={title:"It's Italian time 🇮🇹",body:'A little Italian practice can brighten your day.',url:'./'};
 try { if(event.data) data={...data,...event.data.json()}; } catch {}
 event.waitUntil(self.registration.showNotification(String(data.title).slice(0,80),{
   body:String(data.body).slice(0,180),icon:'./assets/icon-192.png',badge:'./assets/icon-192.png',tag:'italian-reminder',data:{url:'./'},renotify:false
 }));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();event.waitUntil((async()=>{
 const target=new URL('./',self.registration.scope).href;
 const clientsList=await self.clients.matchAll({type:'window',includeUncontrolled:true});
 for(const client of clientsList){if(client.url.startsWith(self.registration.scope)){await client.focus();return;}}
 await self.clients.openWindow(target);
 })());
});