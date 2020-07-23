const VkBot = require('node-vk-bot-api');
//const Markup = require('node-vk-bot-api/lib/markup')
const bot = new VkBot(process.env.TOKEN);

      //  bot.command('Начать', (ctx) => {

        //    ctx.reply('Выберите один из указанных пунктов', null, Markup
        //  .keyboard([
        //    [Markup.button('Хочу сделать заказ', 'primary'), Markup.button('Примеры работ', 'positive'), Markup.button('Инстаграм', 'negative')]
       //   ])
       //   .oneTime(),
       // );
       // })
const app = require('firebase/app'), firebase = app.initializeApp({
    apiKey: "AIzaSyDLkYdTTDYD9Jlqk96tthmvdZ9Bg9uAyag",
    authDomain: "tg-firebase-react-app.firebaseapp.com",
    databaseURL: "https://tg-firebase-react-app.firebaseio.com/",
    projectId: "tg-firebase-react-app",
    storageBucket: "tg-firebase-react-app.appspot.com",
    messagingSenderId: "509204905829",
    appId: "1:509204905829:web:0b03b73ebfa35aeb2eeb8c",
    measurementId: "G-G8ZW8G1XE6"
});
require ('firebase/database')

bot.command(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, ctx => {
    let text = ctx.message.text
    
    
        firebase.database().ref('urls').once('value').then(snap => {
            let url = snap.val()
            if (url) {
                firebase.database().ref('urls').set(url + ', ' + text)
            } else {
                firebase.database().ref('urls').set(text)
            }
            
        })
})


bot.startPolling()
