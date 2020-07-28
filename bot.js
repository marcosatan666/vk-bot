const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');
const api = require('node-vk-bot-api/lib/api');

const token = process.env.TOKEN;

const bot = new VkBot(token);

const session = new Session();
bot.use(session.middleware());

const price = new Scene("price",
	ctx => {
		ctx.scene.next();
		ctx.reply("Прайслист:", "photo-163769788_457239066", Markup.keyboard([
			[Markup.button("Бюст", "primary")],
			[Markup.button("До бедра", "primary")],
			[Markup.button("В полный рост", "primary")]
		]).oneTime())
	},
	ctx => {
		if (ctx.session.repeat) {
			ctx.session.repeat = false;
			ctx.scene.next();
			ctx.reply("Нужно указать число от 1 до 7.");
		} else {
			ctx.scene.next();
			switch (ctx.message.text) {
				case "Бюст": {
					ctx.session.s = 3;
					ctx.session.label = "бюст";
					ctx.reply("Сколько человек? (Укажите число от 1 до 7)");
					break;
				}
				case "До бедра": {
					ctx.session.s = 5;
					ctx.session.label = "до бедра";
					ctx.reply("Сколько человек? (Укажите число от 1 до 7)");
					break;
				}
				case "В полный рост": {
					ctx.session.s = 7;
					ctx.session.label = "в полный рост";
					ctx.reply("Сколько человек? (Укажите число от 1 до 7)");
					break;
				}
				default: {
					ctx.session.toLeave = true;
					ctx.reply("Хотите ли Вы отменить заказ?", null, Markup.keyboard([
						[Markup.button("Нет", "positive"), Markup.button("Да", "negative")]
					]).oneTime())
				}
			}
		}

	},
	ctx => {
		if (ctx.session.toLeave) {
			ctx.session.toLeave = false;
			switch (ctx.message.text) {
				case "Нет": {
					ctx.scene.enter("price", 0);
					break;
				}
				default: {
					ctx.scene.leave();
					ctx.reply("Вы отменили свой заказ.\nВыберите один из указанных пунктов.", null, Markup.keyboard([
						[Markup.button("Хочу заказ", "primary"), Markup.button("Примеры работ", "positive")],
						[Markup.button("Инстаграм", "negative")]
					]))
				}
			}
		} else {
			if (/^\d{1}$/.test(ctx.message.text)) {
				let num = parseInt(ctx.message.text, 10)
				if (num >= 1 && num <= 7) {
					ctx.session.price = ctx.session.s + (ctx.session.s / 2) * (num - 1);
					ctx.session.num = num;
					ctx.scene.next();
					ctx.reply(`Ваш заказ: ${ctx.session.label}\nКоличество человек: ${ctx.session.num}\nИтоговая цена: ${ctx.session.price}$.\n\nЧтобы обсудить все нюансы заказа, пишите [id349515008|мне в ЛС].`, null, Markup.keyboard([
						[Markup.button("Заказать", "positive"), Markup.button("Я ещё подумаю", "negative")]
					]).oneTime())
				} else {
					ctx.session.repeat = true;
					ctx.scene.enter("price", ctx.scene.step - 1);
				}
			} else {
				ctx.session.repeat = true;
				ctx.scene.enter("price", ctx.scene.step - 1);
			}
		}
	},
	ctx => {
		switch (ctx.message.text) {
			case "Заказать": {
				ctx.scene.leave();
				api("users.get", {
					user_ids: ctx.message.from_id,
					access_token: token,
				}).then(function(vk_snap) {
					bot.sendMessage(349515008, `[id${ctx.message.from_id}|${vk_snap.response[0].first_name}] хочет сделать заказ.\n\nЗаказ: ${ctx.session.label}\nКоличество человек: ${ctx.session.num}\nЦена: ${ctx.session.price}$`)
					ctx.reply("Готово! Ваш заказ отправлен.", null, Markup.keyboard([
						[Markup.button("Хочу заказ", "primary"), Markup.button("Примеры работ", "positive")],
						[Markup.button("Инстаграм", "negative")]
					]));
				})
				break;
			}
			default: {
				ctx.scene.leave();
				ctx.reply("Вы отменили свой заказ.\nВыберите один из указанных пунктов.", null, Markup.keyboard([
					[Markup.button("Хочу заказ", "primary"), Markup.button("Примеры работ", "positive")],
					[Markup.button("Инстаграм", "negative")]
				]))
			}
		}
	}
)
const stage = new Stage(price);
bot.use(stage.middleware());

bot.command("Начать", ctx => {
	ctx.reply("Выберите один из указанных пунктов.", null, Markup.keyboard([
		[Markup.button("Хочу заказ", "primary"), Markup.button("Примеры работ", "positive")],
		[Markup.button("Инстаграм", "negative")]
	]))
})

bot.command("Хочу заказ", ctx => {
	ctx.scene.enter("price");
})

////////////////////////////////////////////////////////////

bot.command("Примеры работ", ctx => {
    ctx.reply("Я Соня и с детства увлекаюсь рисованием. С приобретением графического планшета, я наконуц-то могу воплотить свои идеи не только на бумаге, но и в диджитале. Круто, да? А, точно, примеры работ...Пока что их не так уж и много, но я хочу делать свое портофолио ярким и насыщенным, а для этого нужно время. Поэтому, мой дружок-пирожок, потерпи месяцок.", null, Markup.keyboard([
        [Markup.button("Да", "positive"), Markup.button("Неа", "negative")]
        ]).oneTime())

bot.startPolling();
