const VkBot = require('node-vk-bot-api');
 
const bot = new VkBot(process.env.TOKEN);
 
bot.command(/^какой сейчас урок(\.|\?)?$/i, (ctx) => {
 let date = new Date(new Date().getTime() + 10800000);
 ctx.reply(date.toString());
});
 
bot.startPolling();
