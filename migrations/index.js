import { User } from '../models/user.js';
// import { logger } from '../logger/index.js'; 
import { sequelize } from '../models/sequelize.js';
import { TaxiRoute, createDemoRoute } from '../models/taxiRoute.js'; 

const DEBUG = true;

const main = async () => {
        try {
            const syncState = await Promise.all([
                User.sync(),
                TaxiRoute.sync()
            ]);

        if (DEBUG && syncState) {
            
            await createDemoRoute();

        }

    } catch (err) {
        console.error('Migration failed:', err);
    }
}

main();
