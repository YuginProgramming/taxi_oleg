import { bot } from "../app.js";
import { findUserByChatId, updateDiaulogueStatus } from "../models/user.js";
import { dataBot } from "../values.js";

const supportChatId = dataBot.support; // ID чату саппорта

const support = async () => {
    bot.on('callback_query', async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        if (action === 'support') {
            await bot.sendMessage(chatId, 'Вас вітає підтримка УкрВояж, щоб перейти до розмови натисніть на логін: @UkrVoyaj_support');
            
        }
    });
}

export default support;

