import { bot } from "./app.js";
import { keyboards } from './language_ua.js';

export const anketaListiner = async () => {
    bot.on('message', async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        try {
            if (text === '/start') {
                await bot.sendMessage(chatId, 'Вас вітає бот для замовлення таксі', {
                    reply_markup: keyboards.routesMenu
                });
            } else {
                await bot.sendMessage(chatId, 'Unknown command');
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    // Listener for callback queries
    bot.on('callback_query', async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        try {
            switch (action) {
                case 'kyiv':
                    await bot.sendMessage(chatId, 'Ви вибрали маршрут Київ Софія.', {
                        reply_markup: keyboards.scheduleMenu
                    });
                    break;
                case 'odesa':
                    await bot.sendMessage(chatId, 'Ви вибрали маршрут Одеса Львів.', {
                        reply_markup: keyboards.scheduleMenu
                    });
                    break;

                case 'today':
                    await bot.sendMessage(chatId, 'Ви вибрали поїздку сьогодні.');
                    break;
                case 'tomorrow':
                    await bot.sendMessage(chatId, 'Ви вибрали поїздку на завтра.');
                    break;

                default:
                    await bot.sendMessage(chatId, 'Невідома дія.');
                    break;
            }
        } catch (error) {
            console.error('Error callback query:', error);
        }
    });
};
