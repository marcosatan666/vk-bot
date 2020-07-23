const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup')

const bot = new VkBot(process.env.TOKEN);

bot.command('Начать', (ctx) => {

    ctx.reply('Выберите один из указанных пунктов', null, Markup
  .keyboard([
    'Хочу сделать заказ',
    'Примеры работ',
    'Инстаграм'
  ])
  .oneTime(),
);
    

})

bot.startPolling();
