import { Server } from 'restify';
import {
    randomNobelPrize,
    randomNobelPrizeInCategory,
} from '../controllers/nobel-prize.controller';

export const registerNobelPrizeRoutes = (server: Server): void => {
    server.get('/nobel-prize/random', randomNobelPrize);
    server.get('/nobel-prize/random/:category', randomNobelPrizeInCategory);
};
