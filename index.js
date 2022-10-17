require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: ['1gamach'],
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  }
});

client.connect();

client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  let messageRepeatCount = message.split(' ')

  if (message.toLowerCase() === '%ping' && userstate.username === '1gamach') {
    client.say(channel, `pong`)
  }

  if ((message.startsWith('!спам') || message.startsWith('!spam')) && userstate.username === '1gamach') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `${message.slice(8)}`);
    }
  }
  // тг
  if (message.toLowerCase() === '!тг' || message.toLowerCase() === '!tg') {
    client.say(channel, `@${userstate.username} TG - https://t.me/RavshanNstream MorphinTime`)
  }
  if ((message.startsWith('!tg') || message.startsWith('!тг')) && userstate.username === 'ravshann') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `TG - https://t.me/RavshanNstream MorphinTime`);
    }
  }
  // инст
  if (message.toLowerCase() === '!инст' || message.toLowerCase() === '!inst') {
    client.say(channel, `@${userstate.username} inst - https://www.instagram.com/ravshann_13/ MorphinTime`)
  }
  if ((message.startsWith('!инст') || message.startsWith('!inst')) && userstate.username === 'ravshann') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `inst -  https://www.instagram.com/ravshann_13/ MorphinTime`);
    }
  }
  // winline
  if (message.startsWith('!wl') && userstate.username === 'ravshann') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `WINLINE промо: rav - https://winline.tv/3pWr1GS winline-1`);
    }
  }
  // гта
  if ((message.startsWith('!gta') || message.startsWith('!гта')) && userstate.username === '1gamach') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `Arizona RP | Promo: STAYA Подробнее: https://arizona-v.com/`);
    }
  }
  // дискорд
  if (message.toLowerCase() === '!дс' || message.toLowerCase() === '!ds') {
    client.say(channel, `@${userstate.username} https://discord.gg/RhWqUd2P`)
  }
  // донат
  if (message.toLowerCase() === '!донат' || message.toLowerCase() === '!donat') {
    client.say(channel, `@${userstate.username} https://www.donationalerts.com/r/ravshann`)
  }
  // getx
  if (message.startsWith('!гёт') && userstate.username === 'ravshann') {
    for (let i = 0; i < + messageRepeatCount[1]; i++) {
      client.say(channel, `inst -  https://www.instagram.com/ravshann_13/ MorphinTime`);
    }
  }
  onMessageHandler(channel, userstate, message)
  onMessageHandler2(channel, userstate, message)
});

// SPAM MODERATORS

client.on('chat', (channel, user, message, userstate) => {
  if (user.mod) {
    let messageRepeatCount = message.split(' ')

    if (message.toLowerCase() === '%songlist') {
      client.say(channel, `@${userstate.username} https://streamelements.com/ravshann/mediarequest`)
    }
    if (message.startsWith('!tg') || message.startsWith('!тг')) {
      for (let i = 0; i < + messageRepeatCount[1]; i++) {
        client.say(channel, `TG - https://t.me/RavshanNstream MorphinTime`);
      }
    }
    if (message.startsWith('!wl')) {
      for (let i = 0; i < + messageRepeatCount[1]; i++) {
        client.say(channel, `WINLINE промо: rav - https://winline.tv/3pWr1GS winline-1`);
      }
    }
    if (message.startsWith('!инст') || message.startsWith('!inst')) {
      for (let i = 0; i < + messageRepeatCount[1]; i++) {
        client.say(channel, `inst -  https://www.instagram.com/ravshann_13/ MorphinTime`);
      }
    }
    if (message.startsWith('!гёт') || message.startsWith('!get')) {
      for (let i = 0; i < + messageRepeatCount[1]; i++) {
        client.say(channel, `Играй со мной на GetX, с промокодом: VOZDUH - https://t.me/RavshanNstream/5713`);
      }
    }
  }
})

// EMOTEONLY on/off

client.on('message', (channel, userstate, message, self) => {
  if (message.toLowerCase() === '!on' && userstate.username === '1gamach') {
    client.emoteonly(channel)
  }
  if (message.toLowerCase() === '!off' && userstate.username === '1gamach') {
    client.emoteonlyoff(channel)
  }
})

// DELETE MESSAGE

function onMessageHandler(channel, userstate, message) {
   checkTwitchChat(userstate, message, channel)
}

function onMessageHandler2(channel, userstate, message) {
//    checkTwitchChat2(userstate, message, channel)
}

function checkTwitchChat(userstate, message, channel) {
  let BLOCKED_WORDS1 = ['z', 'v', 'zv', 'vz', 'zz', 'vv', 'zzz', 'vvv', 'zvz', 'vzv', 'z v', 'v z', 'zzzz', 'vvvv', 'zzvv', 'vvzz']
  message = message.toLowerCase()
  for (var i = 0; i < BLOCKED_WORDS1.length; i++) {
    if (BLOCKED_WORDS1[i] === message) {
      client.deletemessage(channel, userstate.id)
    }
  }
}

function checkTwitchChat2(userstate, message, channel) {
  message = message.toLowerCase()
  let shouldSendMessage = false
  BLOCKED_WORDS = ['z', 'v']
  shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))
  if (shouldSendMessage) {
    client.deletemessage(channel, userstate.id)
  }
}

// TIMEOUT USER

//client.on('chat', (channel, user, message, userstate) => {
//  if (user.mod) {
//    if (message.toLowerCase() === '!t') {
//    let name = message.slice(3)
//      client.timeout(channel, name, '600')
//    } else if (message.toLowerCase() === '!unt') {
//      let name = message.slice(5)
//      client.unban(channel, name, '600')
//    }
//  }
//})
