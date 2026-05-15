// Firebase Cloud Messaging Service Worker
// Archivo: firebase-messaging-sw.js
// Subir a GitHub junto con index.html
 
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');
 
firebase.initializeApp({
  apiKey: "AIzaSyB0CA58zAt0QjiqRko0pE1vnbvtydTeZqQ",
  authDomain: "iberomuebles-a52eb.firebaseapp.com",
  projectId: "iberomuebles-a52eb",
  storageBucket: "iberomuebles-a52eb.firebasestorage.app",
  messagingSenderId: "1007736455916",
  appId: "1:1007736455916:web:e51b59b8d49e2bc7bd9bc9"
});
 
const messaging = firebase.messaging();
 
// Notificaciones cuando la app está en segundo plano o bloqueada
messaging.onBackgroundMessage(function(payload) {
  console.log('Notificación en background:', payload);
 
  const title = payload.notification?.title || payload.data?.title || 'Ibero Muebles';
  const body  = payload.notification?.body  || payload.data?.body  || 'Tienes un nuevo aviso';
  const icon  = payload.notification?.icon  || '/icon-192.png';
 
  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: false,
    data: payload.data || {}
  });
});
 
// Clic en la notificación — abre la app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes('instalaciones-app') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://producioncp-afk.github.io/instalaciones-app/');
      }
    })
  );
});
