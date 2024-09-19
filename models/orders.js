import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';
import { logger } from '../logger/index.js';

class Orders extends Model {}

Orders.init({
    user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ride_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    freezeTableName: false,
    timestamps: true, 
    modelName: 'orders',
    sequelize
});



export {
    Orders,
};