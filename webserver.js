import e from "express";
import { dataBot } from "./values.js";
import * as crypto from 'crypto';
import bodyParser from "body-parser";
import { bot }from "./app.js";
import { findUserByChatId, findUserByPhone } from "./models/user.js";
import { findRideById } from "./models/rides.js";
import { updateSeatById } from "./models/seats.js";
import { createNewOrder } from "./models/orders.js";
import { buildRouteDescriptions, findRouteById } from "./models/routes.js";


const server = () => {

    const app = e();
    const port = 3001;

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    app.post('/webhook', async (req, res) => {
        try {
            const text = req.body;
            
            // Отримання першого ключа об'єкту
            const firstKey = Object.keys(text)[0];
            
            // Якщо ключ виглядає як JSON-рядок, розбираємо його
            const data = JSON.parse(firstKey);

            const forHash = [
                data.merchantAccount,
                data.orderReference,
                data.amount,
                data.currency,
                data.authCode,
                data.cardPan,
                data.transactionStatus,
                data.reasonCode,
            ].join(';');

            const expectedMerchantSignature = crypto
                .createHmac('md5', dataBot.merchant_sercret)
                .update(forHash)
                .digest('hex');


            if (expectedMerchantSignature !== data.merchantSignature) {
                return res.status(400).json('Corrupted webhook received. Webhook signature is not authentic.');
            }

            console.log(data?.products[0].name)
            
            const metadata = data?.products[0].name.split(',');
            const seat = metadata[0];
            const ride_id = metadata[1];            
            const chat_id = metadata[2];

            console.log(metadata);

            if (data.transactionStatus === 'Approved') {
                console.log(chat_id, seat, ride_id);
               
                const user = await findUserByChatId(chat_id);

                const ride = await findRideById(ride_id);
                const updateSeat = await updateSeatById(ride.seats_id, seat, chat_id);

                const createOrder = await createNewOrder(chat_id, ride_id);
                
                await bot.sendMessage(chat_id, 'Оплата пройшла успішно, квиток за номером телефону',
                    { reply_markup: { inline_keyboard: [[{ text: 'Вихід 🚪', callback_data: 'exit' }]] } }
                );

                const routeData = await findRouteById(ride.route_id)
                            
                const routesDescriprion = await buildRouteDescriptions(routeData);

                await bot.sendMessage(dataBot.ticketsChannel, `
                    Покупка квитка
🚐 ${routesDescriprion[0].description} 
👉 Відправлення: ${ride.year+ '-' + ride.month + '-' + ride.date + '  ' + ride.time}
📍 Місце: ${seat} 
📞 ${user.phone}
💸 Вартість: ${ride.price} грн
                `)

            } else {
                return res.status(200).json('Webhook Error: Unhandled event type');
            }

            const answer = {
                orderReference: data.orderReference,
                status: 'accept',
                time: Date.now(),
                signature: '',
            };
            const forHashString = [answer.orderReference, answer.status, answer.time].join(';');
            const hash = crypto.createHmac('md5', dataBot.merchant_sercret).update(forHashString).digest('hex');
            answer.signature = hash;

            return res.status(200).send(answer);
        } catch (err) {
            console.error('Error processing webhook:', err);
            return res.status(500).send('Server Error');
        }
    });
    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });

}

export default server;


  