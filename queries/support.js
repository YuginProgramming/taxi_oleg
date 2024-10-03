import { bot } from "../app.js";
import { dataBot } from "../values.js";

const supportChatId = dataBot.support; // ID чату саппорта

const support = async () => {
    bot.on('callback_query', async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        if (action === 'support') {
            await updateDialogueStatus(chatId, 'support');
            await bot.sendMessage(chatId, 'Ви звернулися до служби підтримки. Чекайте на відповідь.');
            
            await bot.sendMessage(supportChatId, `Новий запит до підтримки від користувача ${chatId}.`);
        }
    });

    bot.on('message', async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        const user = await findUserByChatId(chatId);
        const status = user.dialogue_status;

        if (status === 'support' && chatId !== supportChatId) {
            await bot.sendMessage(supportChatId, `Повідомлення від користувача ${chatId}: ${text}`);
        } else if (chatId === supportChatId && message.reply_to_message) {
            // Відповідь оператора на запит користувача (через reply)
            const originalMessage = message.reply_to_message.text;
            const targetChatId = extractChatIdFromMessage(originalMessage); 

            // Пересилаємо відповідь оператору до користувача
            await bot.sendMessage(targetChatId, `${text}`);
        }
    });
};

const extractChatIdFromMessage = (message) => {
    const match = message.match(/від користувача (\d+)/);
    return match ? match[1] : null;
};

export default support;

