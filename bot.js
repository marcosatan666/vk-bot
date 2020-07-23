const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup')

const bot = new VkBot(process.env.TOKEN);

bot.command('Начать', (ctx) => {

    ctx.reply('Выберите один из указанных пунктов', null, Markup
  .keyboard([
    [Markup.button('Хочу сделать заказ', 'primary'), Markup.button('Примеры работ', 'positive'), Markup.button('Инстаграм', 'negative')]
  ])
  .oneTime(),
);
    

})

bot.startPolling();
