import { bot } from "./app.js";
import { keyboards, phrases } from './language_ua.js';
import { createNewUserByChatId, findUserByChatId, updateDiaulogueStatus, updateUserByChatId } from './models/user.js';
import { logger } from "./logger/index.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const anketaListiner = async () => {
    bot.on('message', async (message) => {
        const chatId = message.chat.id;
        const text = message.text;

        try {
            if (text === '/start') {                

                const user = await findUserByChatId(chatId);

                await updateDiaulogueStatus(chatId, '');

                if (user) {
                    await bot.sendMessage(
                        chatId, 
                        phrases.mainMenu,
                        { reply_markup: keyboards.selectArea }
                    ); 
                } else {
                    await createNewUserByChatId(chatId);  

                    logger.info(`USER_ID: ${chatId} join BOT`);

                    await bot.sendMessage(
                        chatId, 
                        phrases.botInformation
                    );
    
                    await delay(2000);
    
                    await bot.sendMessage(
                        chatId, 
                        phrases.askNumber,
                        { reply_markup: keyboards.shareNumber }
                    );
    
                }                
            } 
            
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });
    
    bot.on("contact", async (msg) => {

        const phone = msg.contact.phone_number;
        const chatId = msg.chat.id;

        

        try {
            const user = await findUserByChatId(chatId);

            user && await updateUserByChatId(chatId, { phone });

            await bot.sendMessage(
                chatId, 
                phrases.mainMenu,
                { reply_markup: keyboards.selectArea }
            );

        } catch (error) {

            logger.warn(`Cann't update phone number`);

        }

    });

    bot.on("photo", async (msg) => {

        const chatId = msg.chat.id;

        const photo = msg.photo[msg.photo.length - 1];
        const fileId = photo.file_id;

        bot.sendMessage(chatId, `Photo ID: ${fileId}`);

    })
};
