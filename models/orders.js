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

const createNewOrder = async (user, ride_id) => {
    let res;
    try {
        res = await Orders.create({ user, ride_id });
        res = res.dataValues;
        logger.info(`Created user with id: ${res.id}`);
    } catch (err) {
        logger.error(`Impossible to create user: ${err}`);
    }
    return res;
};

export {
    Orders,
    createNewOrder
};