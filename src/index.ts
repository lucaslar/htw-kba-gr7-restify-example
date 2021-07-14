import { createServer, plugins, Server } from 'restify';
import { initData } from './helpers/init-data';
import { registerNobelPrizeRoutes } from './routes/nobel-prize.routes';
import { registerFakeAuthRoutes } from './routes/fake-auth.routes';
import { registerLaureateColleagueRoutes } from './routes/laureate-colleague.routes';

initData().then(() => {
    const [host, port] = ['0.0.0.0', 8080];
    const server: Server = createServer();

    server.use(plugins.bodyParser());
    server.use(plugins.queryParser());

    server.on('BadRequest', (req, res, err, cb) => {
        console.log('Exemplary Bad Request Logging...Error:\n', err);
        return cb();
    });

    server.listen(port, host, () => {
        console.log('Running on:', server.address());
        [
            registerNobelPrizeRoutes,
            registerFakeAuthRoutes,
            registerLaureateColleagueRoutes,
        ].forEach((registerRoutes) => registerRoutes(server));
    });
});
