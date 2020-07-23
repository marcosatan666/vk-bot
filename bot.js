const VkBot = require('node-vk-bot-api');

const bot = new VkBot(process.env.TOKEN);

bot.command('Начать', (ctx) => {

    ctx.reply('Работать блеять')
    

})

bot.startPolling();
