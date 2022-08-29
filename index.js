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
  
    if (message.startsWith('%ping') && userstate.username === '2gamach') {
      client.say(channel, `pong`) 
    }

    if (message.startsWith('!спам') && userstate.username === '2gamach') {
      let messageRepeatCount = message.split(' ')
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `${message.slice(8)}`);
      } 
    }
    let messageRepeatCount = message.split(' ')
    // тг
    if (message.startsWith('!тг')) {
      client.say(channel, `@${userstate.username} TG - https://t.me/RavshanNstream MorphinTime`)
    }
    if (message.startsWith('!tg') && (userstate.username === 'streamelements' || userstate.username === '2gamach' || userstate.username === 'ravshann')) { 
      let messageRepeatCount = message.split(' ')
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `TG - https://t.me/RavshanNstream MorphinTime`);
      }
    }
    // инст
    if (message.startsWith('!инст')) {
      client.say(channel, `@${userstate.username} https://www.instagram.com/ravshann_13/ MorphinTime`)
    }
    if (message.startsWith('!inst') && (userstate.username === 'streamelements' || userstate.username === '2gamach' || userstate.username === 'ravshann')) { 
      let messageRepeatCount = message.split(' ')
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `https://www.instagram.com/ravshann_13/ MorphinTime`);
      }
    }
    // winline
    if (message.startsWith('!wl') && (userstate.username === '2gamach' || userstate.username === 'ravshann')) { 
      let messageRepeatCount = message.split(' ')
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `WINLINE промо: TWITCH - https://winline.tv/3NmrhrZ winline-1`);
      }
    }
    // гта
    if (message.startsWith('!гта') && userstate.username === '2gamach') {
      for (let i = 0; i <+ messageRepeatCount[1]; i++) {
        client.say(channel, `Arizona RP | Promo: STAYA Подробнее: https://arizona-v.com/`);
      }
    }
    // дискорд
     if (message.startsWith('!дс')) {
      client.say(channel, `@${userstate.username} https://discord.gg/pJ5metnr`) 
    }
    
    //onMessageHandler (channel, userstate, message, self)
});

client.on('chat', (channel, user, message, userstate) => {
  if (message.startsWith('!songlist')) {
    if (user.mod) {
      client.say(channel, `@${userstate.username} https://streamelements.com/ravshann/mediarequest`) 
     }
  }
})

// TIMEOUT USER

//client.on('chat', (channel, user, message, userstate) => {
//  if (user.mod) {
//    if (message.startsWith('!t')) {
//    let name = message.slice(3)
//      client.timeout(channel, name, '600')
//    } else if (message.startsWith('!unt')) {
//      let name = message.slice(5)
//      client.unban(channel, name, '600')
//    }
//  }
//})

// DELETE MESSAGE

//function onMessageHandler (channel, userstate, message, self) {
//  checkTwitchChat(userstate, message, channel)
//} 

//function checkTwitchChat(userstate, message, channel) {
//  console.log(message)
//  message = message.toLowerCase()
//  let shouldSendMessage = false
//  shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))
//  if (shouldSendMessage) {
//    client.deletemessage(channel, userstate.id)
//   }
//}