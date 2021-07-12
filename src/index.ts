import { createServer, plugins, Server } from 'restify';
import { initData } from './helpers/init-data';
import { registerNobelPrizeRoutes } from './routes/nobel-prize.routes';
import { registerFakeAuthRoutes } from './routes/fake-auth.routes';

initData().then(() => {
    const [host, port] = ['0.0.0.0', 8080];
    const server: Server = createServer();

    server.use(plugins.bodyParser());

    server.listen(port, host, () => {
        console.log('Running on:', server.address());
        [registerNobelPrizeRoutes, registerFakeAuthRoutes].forEach(
            (registerRoutes) => registerRoutes(server)
        );
    });
});
