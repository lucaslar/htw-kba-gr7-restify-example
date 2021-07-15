import { Server } from 'restify';
import { getLaureateDetailsData } from '../controllers/laureate-details.controller';
import { validateToken } from '../controllers/fake-auth.controller';
import { idFromToken, tokenKey } from '../helpers/fake-token-service';

/**
 * Registers the (guarded) laureate detail routes for a given server.
 *
 * @param server Server the routes are to be registered for.
 */
export const registerLaureateDetailsRoutes = (server: Server): void => {
    // GET route with a specified name and path
    server.get(
        { name: 'laureate-details', path: '/laureate-details' },
        validateToken,
        getLaureateDetailsData
    );

    // Route using a custom middleware with a route renderer
    server.get('/own-data-route', validateToken, (req, res, next) => {
        const id = idFromToken(req.header(tokenKey));
        res.send({

            // Using the router's render function, the path for the named route (see above) is rendered and
            // the path for requesting own data is determined and returned
            route: server.router.render('laureate-details', {}, { id }),
            message:
                'In order to request your own data, please call the route provided in `route`',
        });
        return next();
    });
};
