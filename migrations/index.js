import { User } from '../models/user.js';
// import { logger } from '../logger/index.js'; 
import { sequelize } from '../models/sequelize.js';
import { TaxiRoute } from '../models/taxiRoute.js'; 

const DEBUG = true;

const main = async () => {
        try {
            const syncState = await Promise.all([
                User.sync(),
                TaxiRoute.sync()
            ]);

        if (DEBUG && syncState) {
            const pseudoRandom = () => Math.floor(Math.random() * 10000);
            
            // Define test user data for migration
            const userData = {
                chat_id: pseudoRandom(),  // Random chat_id for testing
                firstname: 'migration_record',
                phone: pseudoRandom().toString(),
                dialoguestatus: '',
            };

            // logger.info('Log created by migration procedure');

            // Create the new user in the database
            const newUser = await User.create(userData);
            console.log(`User created during migration: ${newUser.chat_id}`);
        }

    } catch (err) {
        console.error('Migration failed:', err);
    }
}

main();
