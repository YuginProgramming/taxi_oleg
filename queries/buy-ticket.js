import { bot } from '../app.js';
import { keyboards, phrases } from '../language_ua.js';
import { findCarById } from '../models/cars.js';
import { findAllDomesticsLocations, findAllLocations } from '../models/locations.js';
import { findFutureRidesByRouteID, findRideById } from '../models/rides.js';
import { buildRouteDescriptions, findDomesticRoutesFromDeparture, findInternationalRoutesFromDeparture, findRouteById } from '../models/routes.js';
import { generateDomesticsLocationsMenu, generateLocationsMenu, generateRidesMenu, generateRoutesMenu, generateSeatsMenu } from '../plugins/generate-menu.js';
import { sessionCreate } from '../wfpinit.js';

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
                    const locations = await findAllLocations();

                    const menu = await generateLocationsMenu(locations, 'buyTicket');

                    await bot.sendMessage(
                        chatId,
                        phrases.departure,
                        { reply_markup: { inline_keyboard: menu } }    
                    );
                    break;
                case 'domestics':
                    const domesticsLocations = await findAllDomesticsLocations();

                    const locationsMenu = await generateDomesticsLocationsMenu(domesticsLocations, 'buyTicket');
                    await bot.sendMessage(
                        chatId, 
                        phrases.departure,
                        { reply_markup: { inline_keyboard: locationsMenu } }
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
                    const callback_data = action.split("+");

                    const callback_hook = callback_data[0];

                    const callback_info = callback_data[1];

                    const callback_next = callback_data[2];

                    switch (callback_hook) {
                        case 'loc':
                            

                            const routesFromDeparture = await findInternationalRoutesFromDeparture(callback_info);
                            const routesMenuData = await buildRouteDescriptions(routesFromDeparture);
                            const routesMenu = await generateRoutesMenu(routesMenuData, 'international');
                            await bot.sendMessage(
                                chatId, 
                                phrases.route,
                                { reply_markup: { inline_keyboard: routesMenu } }
                            );
                        break;

                        case 'locDom':
                            

                            const routesFromDomDeparture = await findDomesticRoutesFromDeparture(callback_info);
                            const routesDomData = await buildRouteDescriptions(routesFromDomDeparture);
                            const domRoutes = await generateRoutesMenu(routesDomData, 'domestics');
                            await bot.sendMessage(
                                chatId, 
                                phrases.route,
                                { reply_markup: { inline_keyboard: domRoutes } }
                            );
                        break;

                        case 'route':
                            const nextRides = await findFutureRidesByRouteID(callback_info);
                            const ridesMenu = await generateRidesMenu(nextRides, 'international');

                            
                            await bot.sendMessage(
                                chatId, 
                                phrases.route,
                                { reply_markup: { inline_keyboard: ridesMenu } }
                            );
                        break;

                        case 'ride': 
                            const rideData = await findRideById(callback_info);
                            const carData = await findCarById(rideData.car_id);
                            const route = await findRouteById(rideData.route_id);
                            const routesDescriprion = await buildRouteDescriptions(route);

                            console.log(routesDescriprion)

                            await bot.sendPhoto(
                                chatId, 
                                carData.scheme,
                                { caption: `
                                    🚐 ${routesDescriprion[0].description}
📆 ${rideData.year+ '-' + rideData.month + '-' + rideData.date + '  ' + rideData.time}
💸 ${rideData.price + 'грн.'
                                    }
                                `});

                            const seatsMenu = await generateSeatsMenu(rideData.seats_id, rideData.id, 'international');
                            
                            await bot.sendMessage(
                                chatId, 
                                phrases.seat,
                                { reply_markup: { inline_keyboard: seatsMenu } }
                            );
                            
                        break;
                        case 'seat':
                            const seatRideData = await findRideById(callback_next);
                            const routeSeat = await findRouteById(seatRideData.route_id)
                            
                            const routesSeatDescriprion = await buildRouteDescriptions(routeSeat);

                            console.log(routesSeatDescriprion)
                            const paymentLink = await sessionCreate(seatRideData.price, seatRideData.id, chatId);
                            await bot.sendMessage(
                                chatId, 
                                `
🚐 ${routesSeatDescriprion[0].description} 
👉 Відправлення: ${seatRideData.year+ '-' + seatRideData.month + '-' + seatRideData.date + '  ' + seatRideData.time}
📍 Місце: ${callback_info} 

💸 Вартість: ${seatRideData.price} грн
                                `,
                                { reply_markup: { inline_keyboard: [[{text: 'Оплатити', url: paymentLink}]] } }
                            );
                        break;


                    }                 
                    
                    break;

            }
        } catch (error) {
            console.error('Error buy ticket query:', error);
        }
    });

}

export default buyTicket;