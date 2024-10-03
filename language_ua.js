const keyboards = {
    
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
            [{ text: 'Поїздка по місту', callback_data: 'local' }],
            [{ text: 'Поїздка по Україні', callback_data: 'domestics' }],
            [{ text: 'Поїздка за кордон', callback_data: 'international' }],         
            [{ text: `📩 Служба підтримки `, callback_data: 'support' }, { text: `❗❓ Питання `, callback_data: 'support' }]            
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
Поїздки по Києву, Україні та за кордон.
Приватні замовлення та регулярні маршрути на автотранспорті марки Mercedes різної пасажиромісткості
Вартість замовлення в одній країні 1000 грн.
`,
    askNumber: `Будь ласка, надішліть свій номер телефону за допомогою кнопки нижче  👇:`,
    mainMenu: `Головне меню`,
    select: `Будь ласка, зробіть вибір 👇:`,
    departure: `Для оформлення квитка оберіть місто відправлення 👇:`,
    localDepCity: `Місто відправлення 👇:`,
    route: `Оберіть маршрут поїздки 👇:`,
    ride: `Оберіть дату та час поїздки 👇 або напишіть свою у форматі, рік-місяць-день, за допомогою клавіатури. 
Наприклад, 2021-12-01`,
    seat: `Будь ласка, оберіть місце 👇:`,
    geolocation: 'Будь ласка, надішліть свою геопозицію:',
    sendGeo: 'Або поділіться розташуванням за допомогою кнопки «надіслати геопозицію» 👇:',
    taxiOnTheWay: 'Очікуйте на авто',
    localBookingWrong: 'Трапилась помилка при бронюванні поїздки',
    orderTaken: 'Замовлення прийнято',
    sendAddress: 'Або вкажіть адресу для подачі авто за допомогою клавіатури',
    leaveComment: `Залиште коментар для водія 👇:`,
    comentReceived: 'Коментар отримано',
    noRides: 'Відсутні рейси за даним маршрутом',
    noRoutes: 'Зі вказаного міста відсутні маршрути',
    noSeates: 'Відсутні вільні місця за заданим рейсом',
    paymantAmount: 'Введіть сумму платежу',
    wrongAmount: 'Некоректна сума'
}

// Export the keyboards object
export { keyboards, phrases };
