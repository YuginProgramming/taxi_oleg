import { bot } from '../app.js';
import { keyboards, phrases } from '../language_ua.js';
import { createNewLocalOrder } from '../models/localOrders.js';
import { findAllCities, findCityById } from '../models/taxi-cities.js';
import { findUserByChatId, updateUserByChatId } from '../models/user.js';
import { generateLocaLLocationsMenu } from '../plugins/generate-menu.js';
import { dataBot } from '../values.js';

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

                    const citiesMenu = await generateLocaLLocationsMenu(cities, 'local');

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
                                { reply_markup: { keyboard:
                                    [
                                        [{
                                          text: 'Надіслати геопозицію',
                                          request_location: true
                                        }]
                                      ],
                                      resize_keyboard: true,
                                      one_time_keyboard: true
                                }   }    
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

        console.log(location)

        try {
            const user = await findUserByChatId(chatId);

            const order = await createNewLocalOrder(chatId, location.latitude + ' ' + location.longitude, user.favorite_city);

            const city = await findCityById(user.favorite_city)

            await bot.sendLocation(dataBot.driversChannel, location.latitude, location.longitude);
            await bot.sendMessage(dataBot.driversChannel, `Замовлення №: ${order.id+ ' ' +city.emoji+ ' ' + city.city + ' 📞' + user.phone}`);

            await bot.sendMessage(chatId, 
                phrases.taxiOnTheWay,
                { reply_markup: { inline_keyboard: [[{ text: 'Вихід 🚪', callback_data: 'exit' }]] } }
            )
        } catch (error) {
            console.log(error)
        }

        
    })

}

export {
    localTrip
}