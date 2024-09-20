import { buildRouteDescriptions, findRouteById } from "../models/routes.js";
import { findSeatById } from "../models/seats.js";


const generateLocationsMenu = async (locations, backcallback) => {
    if (!locations) {
        const menu = [
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ],
            
        ]

        return menu;

    } else {

        const menu = locations.map(el => [
            { text: el.city + ' ' + el.country, callback_data: 'loc+' + el.id }
        ]);

        const defaultButttons = 
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ]

        menu.push(defaultButttons);           

        console.log(menu);

        return menu;
    }           

}

const generateDomesticsLocationsMenu = async (locations, backcallback) => {
    if (!locations) {
        const menu = [
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ],
            
        ]

        return menu;

    } else {

        const menu = locations.map(el => [
            { text: el.city + ' ' + el.country, callback_data: 'locDom+' + el.id }
        ]);

        const defaultButttons = 
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ]

        menu.push(defaultButttons);           

        console.log(menu);

        return menu;
    }           

}

const generateRoutesMenu = async (routesData, backcallback) => {
    if (!routesData) {
        const menu = [
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ],
            
        ]

        return menu;

    } else {

        const menu = routesData.map(route => [
            { text: route.description, callback_data: 'route+' + route.id }
        ]);

        const defaultButttons = 
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ]

        menu.push(defaultButttons);           

        console.log(menu);

        return menu;
    }           

}

const generateRidesMenu = async (ridesData, backcallback) => {
    if (!ridesData) {
        const menu = [
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ],
            
        ]

        return menu;

    } else {


        const routes = await Promise.all(ridesData.map(async (ride) => {
            const route = await findRouteById(ride.route_id);
            return route;
        }));

        

        const flattenedRoutes = routes.flat();

        const routesDescriprion = await buildRouteDescriptions(flattenedRoutes);

        console.log(routesDescriprion)

        const menu = ridesData.map((ride, index) => [
            { text: routesDescriprion[index].description+ '    ' + ride.year+ '-' + ride.month + '-' + ride.date + '  ' + ride.time, callback_data: 'ride+' + ride.id }
        ]);

        const defaultButttons = 
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ]

        menu.push(defaultButttons);           

        console.log(menu);

        return menu;
    }           

}

const generateSeatsMenu = async (seatId, ride_id, backcallback) => {
    if (!seatId) {
        const menu = [
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ],
            
        ]

        return menu;

    } else {


        const seats = await findSeatById(seatId);

        if (!seats || !seats.seats) {
            const menu = [
                [
                    { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
                ],
                
            ]
    
            return menu;
        }

        const menu = seats.seats.map((seat, index) => {
            const seatNumber = index + 1;
            if (seat === 0) {
                return  {
                    text: `${seatNumber} 💺`,
                    callback_data: `seat+${seatNumber}+${ride_id}`,
                } ;
            }
            return null;
        }).filter(button => button !== null);      

       

        
        
        const rows = [];

        while (menu.length) {
            rows.push(menu.splice(0, 3)); // Наприклад, по 3 кнопки в рядку
        }

        const defaultButttons = 
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ]

        rows.push(defaultButttons); 

        console.log(rows);

        return rows;
    }           

}


const generateLocaLLocationsMenu = async (locations, backcallback) => {
    if (!locations) {
        const menu = [
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ],
            
        ]

        return menu;

    } else {

        const menu = locations.map(el => [
            { text: el.city + ' ' + el.emoji, callback_data: 'city+' + el.id }
        ]);

        const defaultButttons = 
            [
                { text: 'Назад 👈', callback_data: backcallback }, { text: 'Вихід 🚪', callback_data: 'exit' }
            ]

        menu.push(defaultButttons);           

        console.log(menu);

        return menu;
    }           

}


export {
    generateLocationsMenu,
    generateRoutesMenu,
    generateRidesMenu,
    generateSeatsMenu,
    generateDomesticsLocationsMenu,
    generateLocaLLocationsMenu
}