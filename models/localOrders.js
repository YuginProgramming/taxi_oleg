import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';
import { logger } from '../logger/index.js';

class LocalOrders extends Model {}

LocalOrders.init({
    client: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pickup_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driver: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    freezeTableName: false,
    timestamps: true, 
    modelName: 'local-orders',
    sequelize
});

const createNewLocalOrder = async (client, pickup_location, city) => {
    let res;
    try {
        res = await LocalOrders.create({ client, pickup_location, city});
        res = res.dataValues;
        logger.info(`Created LocalOrder with id: ${res.id}`);
    } catch (err) {
        logger.error(`Impossible to create user: ${err}`);
    }
    return res;
};

export {
    LocalOrders,
    createNewLocalOrder
};