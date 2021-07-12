import { createServer, Server } from 'restify';
import { initData } from './helpers/init-data';
import { registerNobelPrizeRoutes } from './routes/nobel-prize.routes';

initData().then(() => {
    const [host, port] = ['0.0.0.0', 8080];
    const server: Server = createServer();

    server.listen(port, host, () => {
        console.log('Running on:', server.address());
        registerNobelPrizeRoutes(server);
    });
});
