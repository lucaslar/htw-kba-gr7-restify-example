import { Server } from 'restify';
import {
    generateSuperSecretToken,
    login,
} from '../controllers/fake-auth.controller';

/**
 * Registers the fake auth route(s) for a given server.
 *
 * @param server Server the routes are to be registered for.
 */
export const registerFakeAuthRoutes = (server: Server): void => {
    // Basic POST route with two middleware functions:
    server.post('/fake-auth/login', login, generateSuperSecretToken);
};
