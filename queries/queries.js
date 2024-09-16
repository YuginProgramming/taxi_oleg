import { bot } from '../app.js';
import { keyboards } from '../language_ua.js';

const queries = async () => {
    bot.on('callback_query', async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        try {
            switch (action) {
                case 'kyiv':
                    await bot.sendMessage(
                        chatId, 
                        'Ви вибрали маршрут Київ Софія.', 
                        {reply_markup: keyboards.scheduleMenu }
                    );
                    break;
                case 'odesa':
                    await bot.sendMessage(
                        chatId,
                        'Ви вибрали маршрут Одеса Львів.',
                        { reply_markup: keyboards.scheduleMenu }    
                    );
                    break;

                case 'today':
                    await bot.sendMessage(
                        chatId, 
                        'Ви вибрали поїздку сьогодні.'
                    );
                    break;
                case 'tomorrow':
                    await bot.sendMessage(
                        chatId, 
                        'Ви вибрали поїздку на завтра.'
                    );
                    break;

                default:
                    await bot.sendMessage(
                        chatId, 
                        'Невідома дія.'
                    );
                    break;
            }
        } catch (error) {
            console.error('Error callback query:', error);
        }
    });

}

export {
    queries
}