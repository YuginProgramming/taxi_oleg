import { bot } from '../app.js';
import { keyboards, phrases } from '../language_ua.js';

const queries = async () => {
    bot.on('callback_query', async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        try {
            switch (action) {
                case 'exit':
                    await bot.sendMessage(
                    chatId, 
                    phrases.mainMenu,
                    { reply_markup: keyboards.mainMenu }
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
                        'Ви вибрали поїздку сьогодні. Оберіть своє місце в салоні:',
                        { reply_markup: keyboards.sitsMenu }
                    );
                    break;
                case 'tomorrow':
                    await bot.sendMessage(
                        chatId, 
                        'Ви вибрали поїздку на завтра. Оберіть своє місце в салоні:',
                        { reply_markup: keyboards.sitsMenu }
                    );
                    break;
                case 'payment':
                    await bot.sendMessage(
                        chatId, 
                        'Оберіть спсіб оплати:',
                        { reply_markup: keyboards.paymentMenu }
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