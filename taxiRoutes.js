import bot from "./app.js";

bot.on("callback_query", async (query) => {
    const action = query.data;
    const chatId = query.message.chat.id;

    if (action === 'taxiroutes') {
        bot.sendMessage(chatId, 'Зараз ви знаходитися в розділі Квитки, тут ви можете вибрати маршрут.', { 
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Софія', callback_data: 'sofiya' }],
                    [{ text: 'Одеса', callback_data: 'odesa' }]
                ]
            } 
        })
    }})