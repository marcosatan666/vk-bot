const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup')
const firebase = require('firebase')
const bot = new VkBot(process.env.TOKEN);

      //  bot.command('Начать', (ctx) => {

        //    ctx.reply('Выберите один из указанных пунктов', null, Markup
        //  .keyboard([
        //    [Markup.button('Хочу сделать заказ', 'primary'), Markup.button('Примеры работ', 'positive'), Markup.button('Инстаграм', 'negative')]
       //   ])
       //   .oneTime(),
       // );
       // })

bot.on('message', nsg => {
    const id = nsg.chat.id
    let text = nsg.text
    const urlrx = ^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$

    if (urlrx.test(text)){
        firebase.database.ref('url').once('value').then(snap => {
            let url = snap.val()
            firebase.database.ref('url').set(url + ', ' + text)
        })
            
    }
})


bot.startPolling()
