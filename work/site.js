// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const publicKey = 'BN0WlZXMDUbpJOhsi0I3TW_LQ3uJdXUyL-Fg6tNQbUYptKTWJukzpg8fKAUvznVNhMdCE9G-O3_-DN4G9gVvcc4';

navigator.serviceWorker && navigator.serviceWorker.register('sw.js').then(function(registration) {
    console.log('Excellent, serviceWorker registered with scope: ', registration.scope);
});

navigator.serviceWorker && navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager.getSubscription().then(function (subscription) {
        if (subscription) {
            console.info('Got existing subscription', subscription);
            window.subscription = subscription;
            return; //got oneLL
        }

        const applicationServerKey = urlB64ToUint8Array(publicKey);
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function (subscription) {
                console.info('Newly subscribed to push!', subscription);
                window.subscription = subscription;
            });
    })
});