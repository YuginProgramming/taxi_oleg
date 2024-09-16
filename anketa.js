import { bot } from "./app.js";
import { keyboards } from './language_ua.js';

export const anketaListiner = async () => {
    bot.on('message', async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        try {
            if (text === '/start') {
                await bot.sendMessage(
                    chatId, 
                    'Вас вітає бот для замовлення таксі', 
                    { reply_markup: keyboards.routesMenu }
                );
            } else {
                await bot.sendMessage(
                    chatId, 
                    'Unknown command');
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });    
};
