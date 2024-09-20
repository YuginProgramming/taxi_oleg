import { bot } from '../app.js';
import { keyboards, phrases } from '../language_ua.js';
import { findAllCities } from '../models/taxi-cities.js';
import { updateUserByChatId } from '../models/user.js';
import { generateLocaLLocationsMenu } from '../plugins/generate-menu.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const localTrip = async () => {
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
                case 'local':
                    const cities = await findAllCities();

                    const citiesMenu = await generateLocaLLocationsMenu(cities);

                    await bot.sendMessage(
                        chatId,
                        phrases.localDepCity,
                        { reply_markup: { inline_keyboard: citiesMenu } }    
                    );
                    break;
                default:
                    const callback_data = action.split("+");

                    const callback_hook = callback_data[0];

                    const callback_info = callback_data[1];

                    const callback_next = callback_data[2];

                    switch (callback_hook) {
                        case 'city':
                            const city = await updateUserByChatId(chatId, { favorite_city: callback_info });

                            await bot.sendPhoto(
                                chatId,
                                'AgACAgIAAxkBAAMsZu1lYLwq8Sgxg0lbkpK847-vaQYAAkrmMRtbL2hL4YcfYGuNAAExAQADAgADeQADNgQ',
                                { caption: phrases.geolocation }    
                            );

                            await delay (2000);

                            await bot.sendMessage(
                                chatId,
                                phrases.sendGeo,
                                { reply_markup:  [
                                    [{
                                      text: 'Надіслати геопозицію',
                                      request_location: true
                                    }]
                                  ],
                                  one_time_keyboard: true }    
                            );

                        break;
                    }                
            }
        } catch (error) {
            console.error('Error callback query:', error);
        }
    });

    bot.on("location", async (msg) => {
        const chatId = msg.chat.id;
        const location = msg.location;
    })

}

export {
    localTrip
}