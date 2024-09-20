import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';
import { logger } from '../logger/index.js';


class Driver extends Model {}
Driver.init({
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },

}, {
    freezeTableName: false,
    timestamps: true,
    modelName: 'drivers',
    sequelize
});


const createNewDriverByChatId = async (chat_id) => {
    let res;
    try {
        res = await User.create({ chat_id });
        res = res.dataValues;
        logger.info(`Created user with id: ${res.id}`);
    } catch (err) {
        logger.error(`Impossible to create user: ${err}`);
    }
    return res;
};


export {
    Driver,
    createNewDriverByChatId,
};   