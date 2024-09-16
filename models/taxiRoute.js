import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';
//import { logger } from '../logger/index.js';

class TaxiRoute extends Model {}

TaxiRoute.init({
    departure_city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target_city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departure_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    arrival_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: false,  // Allows Sequelize to pluralize table names (optional)
    timestamps: true,        // Automatically adds `createdAt` and `updatedAt` fields
    modelName: 'taxi_routes',  // The name of the model
    sequelize                 // Pass the connection instance
});

const createDemoRoute = async () => {
    try {
        const demoRouteData = {
            departure_city: 'Одеса',
            target_city: 'Софія',
            departure_time: new Date('2024-09-13T08:00:00'),  // Set specific date and time
            arrival_time: new Date('2024-09-13T21:00:00')
        };

        console.log('Creating demo bus route...');

        // Create a new bus route entry in the database
        const demoRoute = await TaxiRoute.create(demoRouteData);

        console.log('Demo route created:', demoRoute.toJSON());
    } catch (err) {
        console.error('Error creating demo route:', err);
    }
};

// Example of invoking the function
//createDemoRoute();

export {
    TaxiRoute
};