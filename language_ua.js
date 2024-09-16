// language_ua.js:
import { generateKeyboard } from './src/generateKeyboard.js';


const keyboards = {
    routesMenu: {
        inline_keyboard: [
            [{ text: '🇧🇬 Київ Софія', callback_data: 'kyiv' }],
            [{ text: '🇺🇦 Одеса Львів', callback_data: 'odesa' }]
        ]
    },
    scheduleMenu: {
        inline_keyboard: [
            [{ text: 'Сьогодні', callback_data: 'today' }],
            [{ text: 'Завтра', callback_data: 'tomorrow' }]
        ]
    },
    sitsMenu: {
        inline_keyboard: [
            [{ text: '1', callback_data: 'sit1' }, { text: '2', callback_data: 'sit2' }, { text: '3', callback_data: 'sit3' }],
            [{ text: '4', callback_data: 'sit4' }, { text: '5', callback_data: 'sit5' }, { text: '6', callback_data: 'sit6' }],
            [{ text: '7', callback_data: 'sit7' }, { text: '8', callback_data: 'sit8' }]
        ]
    },    
    mainMenu: {
        keyboard: [
            [{ text: 'Купити квиток' }],
            [{ text: 'Вибрати маршрут' }],
            [{ text: 'Мій профіль' }],
            [{ text: 'Служба підтримки' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    },
    contactRequest: {
        keyboard: [
            [{ text: 'Поділитися номером', request_contact: true }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    },
    dataConfirmation: {
        keyboard: [
            [{ text: 'Так, Оформити замовлення' }],
            [{ text: 'Ні, повторити введення' }],
            [{ text: '/start' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    },
    lowBalance: {
        keyboard: [
            [{ text: 'Поповнити баланс картки' }],
            [{ text: 'Вибрати інший спосіб оплати' }],
            [{ text: 'Повернутися до головного меню' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    },
    binarKeys: {
        keyboard: [
            [{ text: 'Так' }],
            [{ text: 'Ні' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    },
    failVerify: {
        keyboard: [
            [{ text: 'Служба підтримки' }],
            [{ text: 'Повернутися до головного меню' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    },
    mainMenuButton: {
        keyboard: [
            [{ text: 'Повернутися до головного меню' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    },
    paymantMethod: {
        keyboard: [
            [{ text: 'Готівкою' }],
            [{ text: 'Картка Visa/Mastercard' }],
            [{ text: 'Балансом картки Водолій' }]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    }
};

// Export the keyboards object
export { keyboards };
