var deferredPrompt;

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('the-magic-cache').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/clear.html',
                '/dragon.html',
                '/faq.html',
                '/manifest.json',
                '/background.jpeg',
                '/construction.gif',
                '/dragon.png',
                '/logo.png',
                '/site.js',
                '/dragon.js',
                '/styles.css',
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    if (event.request.url == 'https://dragon-server.appspot.com/') {
        console.info('responding to dragon-server fetch with Service Worker! 🤓');
        event.respondWith(fetch(event.request).catch(function (e) {
            let out = {Gold: 1, Size: -1, Actions: []};
            return new Response(JSON.stringify(out));
        }));
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function (response) {
           return response || fetch (event.request);
        })
    );
});

self.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
});

/*
btnAdd.addEventListener('click', function (e) {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
    } else {
        console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
    });
});
*/

self.addEventListener('push', function (event) {
    event.waitUntil(
        self.registration.showNotification('Got Push? / Push получен?', {
            icon: 'https://www.tinkoff.ru/system/images/ok.png',
            badge: 'https://www.tinkoff.ru/system/images/ok.png',
            body: 'Push message received',
            vibrate: [500, 500, 500, 500, 500],
            tag: 'push-sample',
            actions: [
                {action: 'like', title: '👍Like'},
                {action: 'reply', title: '⤻ Reply'}]

        })
    )
});

self.addEventListener('onnotificationclick', function(event) {
    var messageId = event.notification.data;

    event.notification.close();

    if (event.action === 'like') {
        silentlyLikeItem();
    }
    else if (event.action === 'reply') {
        clients.openWindow("/messages?reply=" + messageId);
    }
    else {
        clients.openWindow("/messages?reply=" + messageId);
    }
}, false);