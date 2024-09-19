import { Model, DataTypes } from "sequelize";
import { sequelize } from './sequelize.js';
import { logger } from '../logger/index.js';

class Seats extends Model {}

Seats.init({
    ride_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seats: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true
    },
    
}, {
    freezeTableName: false,
    timestamps: false, 
    modelName: 'seats',
    sequelize
});

const findSeatById = async (id) => {
    const res = await Seats.findOne({ where: { id } });
    if (res) return res.dataValues;
    return res;
};


export {
    Seats,
    findSeatById
};