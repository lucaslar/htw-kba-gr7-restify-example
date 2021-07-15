import { Server } from 'restify';
import {
    randomNobelPrize,
    randomNobelPrizeInCategory,
} from '../controllers/nobel-prize.controller';

/**
 * Registers the random Nobel Prize routes for a given server.
 *
 * @param server Server the routes are to be registered for.
 */
export const registerNobelPrizeRoutes = (server: Server): void => {
    // Basic GET route:
    server.get('/nobel-prize/random', randomNobelPrize);

    // Basic GET route with a parameter (:category => will be replaced by whatever
    // the user enters and processed in the middleware function)
    // e.g. /nobel-prize/random/medicine
    server.get('/nobel-prize/random/:category', randomNobelPrizeInCategory);
};
