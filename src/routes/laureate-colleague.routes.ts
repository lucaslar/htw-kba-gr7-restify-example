import { Server } from 'restify';
import { getColleagueData } from '../controllers/laureate-colleague.controller';
import { validateToken } from '../controllers/fake-auth.controller';
import { idFromToken, tokenKey } from '../helpers/fake-token-service';

export const registerLaureateColleagueRoutes = (server: Server): void => {
    server.get(
        { name: 'laureate-details', path: '/laureate-details' },
        validateToken,
        getColleagueData
    );

    server.get('/own-data-route', validateToken, (req, res, next) => {
        const id = idFromToken(req.header(tokenKey));
        res.send({
            route: server.router.render('laureate-details', {}, { id }),
            message:
                'In order to request your own data, please call the route provided in `route`',
        });
        return next();
    });
};
