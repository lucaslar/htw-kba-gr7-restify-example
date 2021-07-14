import { Server } from 'restify';
import {
    getColleagueData,
    getOwnData,
} from '../controllers/laureate-colleague.controller';
import { validateToken } from '../controllers/fake-auth.controller';

export const registerLaureateColleagueRoutes = (server: Server): void => {
    server.get('/laureate-colleague', validateToken, getColleagueData);
    server.get('/own-data', validateToken, getOwnData);
};
