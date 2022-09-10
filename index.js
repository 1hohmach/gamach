require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
    connection: {
        reconnect: true
    },
	channels: [ '2gamach' ],
    identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	}
});

client.connect();

client.on('message', (channel, userstate, message, self) => {
    if(self) return;
    let messageRepeatCount = message.split(' ')

    if (message.toLowerCase() === '%ping' && userstate.username === '2gamach') {
      client.say(channel, `pong`) 
    }

    if (message.startsWith('!spam') && userstate.username === '2gamach') {
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `${message.slice(8)}`);
      } 
    }
    // тг
    if (message.toLowerCase() === '!тг' || message.toLowerCase() === '!tg') {
      client.say(channel, `@${userstate.username} TG - https://t.me/RavshanNstream MorphinTime`)
    }
    if ((message.startsWith('!tg') || message.startsWith('!тг')) && userstate.username === '2gamach') { 
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `TG - https://t.me/RavshanNstream MorphinTime`);
      }
    }
    // инст
    if (message.toLowerCase() === '!инст' || message.toLowerCase() === '!inst') {
      client.say(channel, `@${userstate.username} inst - https://www.instagram.com/ravshann_13/ MorphinTime`)
    }
    if ((message.startsWith('!инст') || message.startsWith('!inst')) && (userstate.username === 'StreamElements' || userstate.username === '2gamach' || userstate.username === 'ravshann')) { 
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `inst -  https://www.instagram.com/ravshann_13/ MorphinTime`);
      }
    }
    // каз
    if (message.startsWith('!каз') && userstate.username === 'ravshann') { 
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `https://t.me/RavshanNstream/5019 MorphinTime`);
      }
    }
    // winline
    if (message.startsWith('!wl') && userstate.username === 'ravshann') { 
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `WINLINE промо: TWITCH - https://winline.tv/3NmrhrZ winline-1`);
      }
    }
    // гта
    if ((message.startsWith('!gta') || message.startsWith('!гта')) && userstate.username === '2gamach') {
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `Arizona RP | Promo: STAYA Подробнее: https://arizona-v.com/`);
      }
    }
    // дискорд
    if (message.toLowerCase() === '!дс' || message.toLowerCase() === '!ds') {
      client.say(channel, `@${userstate.username} https://discord.gg/pJ5metnr`) 
    }
    if (message.toLowerCase() === '!каз') {
      client.say(channel, `@${userstate.username} https://t.me/RavshanNstream/5019 MorphinTime`) 
    }

  //onMessageHandler (channel, userstate, message, self)
});

// spam moderators

client.on('chat', (channel, user, message) => {
  if (user.mod) {
    let messageRepeatCount = message.split(' ')

    if (message.toLowerCase() === '!songlist') {
      client.say(channel, `@${userstate.username} https://streamelements.com/ravshann/mediarequest`) 
     }
    if (message.toLowerCase() === '!tg' || message.toLowerCase() === '!тг') { 
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `TG - https://t.me/RavshanNstream MorphinTime`);
      }
    }
    if (message.toLowerCase() === '!wl') {
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `WINLINE промо: TWITCH - https://winline.tv/3NmrhrZ winline-1`);
      }
    }
    if (message.toLowerCase() === '!каз') {
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `https://t.me/RavshanNstream/5019 MorphinTime`);
      }
    }
  }
})

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

// DELETE MESSAGE

function onMessageHandler (channel, userstate, message) {
  checkTwitchChat(userstate, message, channel)
} 

function checkTwitchChat(userstate, message, channel) {
  let BLOCKED_WORDS = ['z', 'v', 'zv', 'vz', 'zz', 'vv']
  console.log(message)
  message = message.toLowerCase()
  for (var i = 0; i < BLOCKED_WORDS.length; i++) {
        if (BLOCKED_WORDS[i] === message) {
            client.deletemessage(channel, userstate.id)
        }
    }
}