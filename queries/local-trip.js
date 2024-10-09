import { bot } from '../app.js';
import { keyboards, phrases } from '../language_ua.js';
import { createNewLocalOrder, updateCommentLocalOrderById } from '../models/localOrders.js';
import { findAllCities, findCityById } from '../models/taxi-cities.js';
import { findUserByChatId, updateDiaulogueStatus, updateUserByChatId } from '../models/user.js';
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
                    await updateDiaulogueStatus(chatId, '');

                    await bot.sendMessage(
                        chatId, 
                        phrases.botInformation
                    );
                    
                    await bot.sendMessage(
                    chatId, 
                    phrases.mainMenu,
                    { reply_markup: keyboards.selectArea }
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

                            await delay (2000);

                            await bot.sendMessage(
                                chatId,
                                phrases.sendAddress                                 
                            );

                            await updateDiaulogueStatus(chatId, 'address');

                        break;

                        case 'localComment': 
                            await bot.sendMessage(
                                chatId,
                                phrases.leaveComment,
                                { reply_markup: { inline_keyboard: [[{ text: 'Вихід 🚪', callback_data: 'exit' }]] } }    
                            );

                            await updateDiaulogueStatus(chatId, 'localComment+' + callback_info);
                        break;

                        case 'localComment': 
                            await bot.sendMessage(
                                chatId,
                                phrases.leaveComment,
                                { reply_markup: { inline_keyboard: [[{ text: 'Вихід 🚪', callback_data: 'exit' }]] } }    
                            );

                            await updateDiaulogueStatus(chatId, 'localComment+' + callback_info);
                        break;

                        case 'direction': 
                            await bot.sendMessage(
                                chatId,
                                phrases.leaveComment,
                                { reply_markup: { inline_keyboard: [
                                    [{ text: 'Вказати напрямок руху', callback_data: `direction+${order.id}` }],
                                    [{ text: 'Залишити напрямок руху довільним', callback_data: `anydirection+${order.id}` }]
                                    [{ text: 'Вихід 🚪', callback_data: 'exit' }]] } }    
                            );

                            await updateDiaulogueStatus(chatId, 'localComment+' + callback_info);
                        break;

                        case 'anydirection': 

                            const paymentLink = await sessionCreate(1000, 'local', callback_info, chatId);

                            await bot.sendMessage(
                                chatId,
                                phrases.rules,
                                { reply_markup: { inline_keyboard: [
                                    [{ text: 'Замовити', url: paymentLink }],
                                    [{ text: 'Вихід 🚪', callback_data: 'exit' }]] } }    
                            );

                            await updateDiaulogueStatus(chatId, 'localComment+' + callback_info);
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

        console.log(location);

        await updateDiaulogueStatus(chatId, '');

        const user = await findUserByChatId(chatId);

        const order = await createNewLocalOrder(chatId, location.latitude + ' ' + location.longitude, user.favorite_city);

        await bot.sendMessage(chatId, 
            phrases.taxiOnTheWay,
            { reply_markup: { inline_keyboard: [
                [{ text: 'Вказати напрямок руху', callback_data: `direction+${order.id}` }],
                [{ text: 'Залишити напрямок руху довільним', callback_data: `anydirection+${order.id}` }]
                [{ text: 'Вихід 🚪', callback_data: 'exit' }],
                [{ text: 'Залишити коментар 💬', callback_data: `localComment+${order.id}` }],
                
            ]} }
        )

        try {
            const city = await findCityById(user.favorite_city)

            await bot.sendLocation(dataBot.driversChannel, location.latitude, location.longitude);
            await bot.sendMessage(dataBot.driversChannel, `Замовлення №: ${order.id+ ' ' +city.emoji+ ' ' + city.city + ' 📞' + user.phone}`);

            
        } catch (error) {
            console.log(error)
        }

        
    })

    bot.on('message', async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        

        const user = await findUserByChatId(chatId);

        const status = user.dialogue_status;

        
        const status_data = status ? status.split("+") : null;
        const status_hook = status_data?.[0];

        const status_info = status_data?.[1];
        
        if (user && user.dialogue_status === 'address') {
            await updateDiaulogueStatus(chatId, '');

            const order = await createNewLocalOrder(chatId, text, user.favorite_city);

            const city = await findCityById(user.favorite_city)

            await bot.sendMessage(dataBot.driversChannel, text);
            await bot.sendMessage(dataBot.driversChannel, `Замовлення №: ${order.id+ ' ' +city.emoji+ ' ' + city.city + ' 📞' + user.phone}`);

            await bot.sendMessage(chatId, 
                phrases.taxiOnTheWay,
                { reply_markup: { inline_keyboard: [
                    [{ text: 'Вихід 🚪', callback_data: 'exit' }],
                    [{ text: 'Залишити коментар 💬', callback_data: `localComment+${order.id}` }]
                ]}}
            );
        }

        if (status_hook === 'localComment') {
            await updateDiaulogueStatus(chatId, '');

            await updateCommentLocalOrderById(status_info, text)

            await bot.sendMessage(dataBot.driversChannel, `Замовлення №: ${status_info+ ' 💬 Коментар: ' +text}`);

            await bot.sendMessage(chatId, 
                phrases.comentReceived,
                { reply_markup: { inline_keyboard: [[{ text: 'Вихід 🚪', callback_data: 'exit' }]] } }
            )
        }
    })

}

export {
    localTrip
}