import { WFP, WFP_CONFIG } from 'overshom-wayforpay';
import { dataBot } from './values.js';

WFP_CONFIG.DEFAULT_PAYMENT_CURRENCY = 'UAH';

const wfp = new WFP({
    MERCHANT_ACCOUNT: 'itgin_online',
    MERCHANT_SECRET_KEY: dataBot.merchant_sercret,
    MERCHANT_DOMAIN_NAME: '51.20.1.118:3001',
    // service URL needed to receive webhooks
    SERVICE_URL: 'http://51.20.1.118:3001/webhook',
});

const sessionCreate = async (price, seat, ride_id, chatId) => {
    const session = await wfp.createInvoiceUrl({
        orderReference: (Math.random() * 1e17).toString(),
        productName: [seat + '+' + ride_id + '+' + chatId],
        productCount: [1],
        productPrice: [price],
    });
    console.log(session)
    return session.value?.invoiceUrl;
}



export {wfp, sessionCreate}




