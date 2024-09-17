import { bot } from '../app.js';
import { keyboards, phrases } from '../language_ua.js';
import { findDeparturesByArea, findRoutesByDepature } from '../models/taxiRoute.js';
import generateMenu from '../plugins/generate-menu.js';

const buyTicket = async () => {
    bot.on('callback_query', async (query) => {
        const action = query.data;
        const chatId = query.message.chat.id;

        console.log(action)

        try {
            switch (action) {
                case 'buyTicket':                    

                    await bot.sendMessage(
                        chatId, 
                        phrases.select, 
                        { reply_markup: keyboards.selectArea },
                    );
                    break;

                case 'international':
                    const data = await findDeparturesByArea('international');

                    const menu = await generateMenu(data, 'buyTicket');

                    await bot.sendMessage(
                        chatId,
                        phrases.departure,
                        { reply_markup: { inline_keyboard: menu } }    
                    );
                    break;
                case 'domestics':
                    await bot.sendMessage(
                        chatId, 
                        phrases.departure,
                        { reply_markup: keyboards.sitsMenu }
                    );
                    break;
                case 'local':
                    await bot.sendMessage(
                        chatId, 
                        phrases.departure,
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
                default:
                    const routesData = await findRoutesByDepature(action);

                    const routes = routesData.map(route => `${route.departure_city + ' - ' + route.target_city}`);

                    console.log(routes);

                    const routesMenu = await generateMenu(routes, 'international');
                   
                    await bot.sendMessage(
                        chatId, 
                        phrases.route,
                        { reply_markup: { inline_keyboard: routesMenu } }
                    );
                    break;

            }
        } catch (error) {
            console.error('Error buy ticket query:', error);
        }
    });

}

export default buyTicket;