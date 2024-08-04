// 'use client';

// import PusherServer from 'pusher';
// import PusherClient from 'pusher-js';

// declare global {
//   var pusherServerInstance: PusherServer | undefined;
//   var pusherClientInstance: PusherClient | undefined;
// }

// const ID = process.env.PUSHER_APP_ID;
// console.log('🚀 ~ ID:', ID);
// const KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
// console.log('🚀 ~ KEY:', KEY);
// const SECRET = process.env.PUSHER_SECRET;
// console.log('🚀 ~ SECRET:', SECRET);

// if (!ID || !KEY || !SECRET) {
//   throw new Error('missing key');
// }
// if (!global.pusherServerInstance) {
//   global.pusherServerInstance = new PusherServer({
//     appId: ID,
//     key: KEY,
//     secret: SECRET,
//     cluster: 'ap1',
//     useTLS: true,
//   });
// }

// if (!global.pusherClientInstance) {
//   global.pusherClientInstance = new PusherClient(KEY, {
//     channelAuthorization: {
//       endpoint: '/api/pusher-auth',
//       transport: 'ajax',
//     },
//     cluster: 'ap1',
//   });
// }

// export const pusherServer = global.pusherServerInstance;
// export const pusherClient = global.pusherClientInstance;

import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'ap1',
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
      channelAuthorization: {
        endpoint: '/api/pusher-auth',
        transport: 'ajax',
      },
      cluster: 'ap1',
    }
  );
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;
