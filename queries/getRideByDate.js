import { findAllTodayRouteRides } from "../models/rides";
import parseDateString from "../plugins/pasrseDate";


const getRideByDate = () => {
    bot.on('message', async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        const user = await findUserByChatId(chatId);

        const status = user.dialogue_status;

        const rideData = status.split("+");

        const date = parseDateString(text);

        if (date) {

            const rides = await findAllTodayRouteRides(rideData[1], date[0], date[1], date[2]);

            const ridesMenu = await generateRidesMenu(rides, 'buyTicket', chatId);

            if (!ridesMenu) return;
                            
            await updateDiaulogueStatus(chatId, ``);

            await bot.sendMessage(
                chatId, 
                phrases.ride,
                { reply_markup: { inline_keyboard: ridesMenu } }
            );

        }
    })
}