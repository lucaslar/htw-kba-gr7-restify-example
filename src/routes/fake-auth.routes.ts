import { Server } from 'restify';
import { login } from '../controllers/fake-auth.controller';

export const registerFakeAuthRoutes = (server: Server): void => {
    server.post('/fake-auth/login', login);
};
