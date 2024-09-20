const keyboards = {
    routesMenu: {
        inline_keyboard: [
            [{ text: '🇧🇬 Київ Софія', callback_data: 'kyiv' }],
            [{ text: '🇺🇦 Одеса Львів', callback_data: 'odesa' }]
        ]
    },
    scheduleMenu: {
        inline_keyboard: [
            [{ text: '🕗 Сьогодні', callback_data: 'today' }],
            [{ text: '🕗 Завтра', callback_data: 'tomorrow' }]
        ]
    },
    sitsMenu: {
        inline_keyboard: [
            [{ text: '🪑 1', callback_data: 'payment' }, { text: '🪑 2', callback_data: 'payment' }, { text: '🪑 3', callback_data: 'payment' }],
            [{ text: '🪑 4', callback_data: 'payment' }, { text: '🪑 5', callback_data: 'payment' }, { text: ' 🪑6', callback_data: 'payment' }],
            [{ text: '🪑 7', callback_data: 'payment' }, { text: '🪑 8', callback_data: 'payment' }]
        ]
    },    
    paymentMenu: {
        inline_keyboard: [
            [{ text: '💳 Оплатити зараз карткою', callback_data: 'sit7' }],
            [{ text: '💵 Оплатити готівкою водію в салоні', callback_data: 'sit7' }]
        ]
    },
    mainMenu: {
        inline_keyboard: [
            [{ text: `🎫 Купити квиток `, callback_data: 'buyTicket' }],
            [{ text: `🗺️ Вибрати маршрут `, callback_data: 'selectRoute' }],
            [{ text: `🧑‍💼 Мій профіль `, callback_data: 'myProfile' }],
            [{ text: `📩 Служба підтримки `, callback_data: 'support' }, { text: `❗❓ Питання `, callback_data: 'support' }]
        ]
    },

    selectArea: {
        inline_keyboard: [
            [{ text: 'По місту', callback_data: 'local' }],
            [{ text: 'Поїздка по Україні', callback_data: 'domestics' }],
            [{ text: 'Міжнародна поїздка', callback_data: 'international' }],         
            [{ text: 'Вихід 🚪', callback_data: 'exit' }]            
        ]
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
    },
    shareNumber: { keyboard: [
        [{ 
            text: 'Поділитися номером',
            request_contact: true, 
        }]
      ], 
        resize_keyboard: true,
        one_time_keyboard: true 
    },
};

const phrases = {
    botInformation: `
🚖 Вас вітає чат-бот Taxi Premium Service! 🚘

Ми пропонуємо:

Поїздки по Києву та Україні в комфортних 6-8 місних Mercedes (останні моделі)
Міжміські та міжнародні маршрути
Обслуговування цілодобово
`,
    askNumber: `Будь ласка, надішліть свій номер телефону за допомогою кнопки нижче  👇:`,
    mainMenu: `Головне меню`,
    select: `Будь ласка, зробіть вибір 👇:`,
    departure: `Для оформлення квитка оберіть місто відправлення 👇:`,
    localDepCity: `Місто поїздки 👇:`,
    route: `Оберіть маршрут поїздки 👇:`,
    ride: `Оберіть рейс 👇:`,
    seat: `Будь ласка, оберіть місце 👇:`,
    geolocation: 'Будь ласка, надішліть свою геопозицію:',
    sendGeo: 'Або поділіться розташуванням за допомогою кнопки 👇:'
}

// Export the keyboards object
export { keyboards, phrases };
