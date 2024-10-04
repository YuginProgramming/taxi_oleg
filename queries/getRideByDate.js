import { bot } from "../app.js";
import { phrases } from "../language_ua.js";
import { findAllTodayRouteRides } from "../models/rides.js";
import { findUserByChatId, updateDiaulogueStatus } from "../models/user.js";
import { generateRidesMenu } from "../plugins/generate-menu.js";
import parseDateString from "../plugins/pasrseDate.js";


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
                            
            

            await bot.sendMessage(
                chatId, 
                phrases.ride,
                { reply_markup: { inline_keyboard: ridesMenu } }
            );

        }
    })
}

export default getRideByDate;