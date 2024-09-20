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

const updateSeatById = async (seats_id, seat, chat_id) => {
    try {
        const seatRecord = await Seats.findOne({ where: { id: seats_id } });
        
        if (seatRecord) {
            const currentSeats = seatRecord.seats || [];

            if (seat >= 0 && seat < currentSeats.length) {
                currentSeats[seat] = chat_id;

                const res = await Seats.update({ seats: currentSeats }, { where: { id: seats_id } });

                if (res[0]) {
                    const seatRecord = await Seats.findOne({ where: { id: seats_id } });
                    if (seatRecord) {
                        logger.info(`User ${seatRecord.chat_id} get seat: ${seat + 1}`);
                        return seatRecord;
                    }
                    logger.info(`User ${chat_id} updated, but can't read result data`);
                } else {
                    logger.warn(`Failed to update seat ${seat + 1} for seats_id ${seats_id}`);
                }
            } else {
                logger.warn(`Invalid seat index ${seat} for seats_id ${seats_id}`);
            }
        } else {
            logger.warn(`No seat record found for id ${seats_id}`);
        }

        return undefined;

    } catch (error) {
        logger.error(`Error updating seat ${seat + 1}: ${error.message}`);
        throw error;
    }
};



export {
    Seats,
    findSeatById,
    updateSeatById
};