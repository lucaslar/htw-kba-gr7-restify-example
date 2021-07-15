import { createServer, plugins, Server } from 'restify';
import { initData } from './helpers/init-data';
import { registerNobelPrizeRoutes } from './routes/nobel-prize.routes';
import { registerFakeAuthRoutes } from './routes/fake-auth.routes';
import { registerLaureateDetailsRoutes } from './routes/laureate-details.routes';

// THIS IS THE APPLICATION'S ENTRY POINT.

// Initializes the data, i.e. requests it. Afterwards (then(() => ...)...
initData().then(() => {
    // Define host and port and create a Restify server
    const [host, port] = ['0.0.0.0', 8080];
    const server: Server = createServer();

    // Plugin for supporting malformed URLs (extra slashes): e.g. <url>////something///
    server.pre(plugins.pre.dedupeSlashes());

    // Plugins to be used (use => available in each route)
    // .use(...) should be called before defining routes
    server.use(plugins.bodyParser()); // For parsing POST data
    server.use(plugins.queryParser()); // For parsing GET data

    // An exemplary function executed in case of throwing a
    // BadRequest using Restify's "next" syntax.
    server.on('BadRequest', (req, res, err, cb) => {
        console.log('Exemplary Bad Request Logging...Error:\n', err);
        return cb();
    });

    // Starts the server on http://0.0.0.0:8080 (see host/port above)
    // and afterwards (callback function)...
    server.listen(port, host, () => {
        console.log('Running on:', server.address());

        // Register each route, i.e. call each function registering routes
        // for our server:
        [
            registerNobelPrizeRoutes,
            registerFakeAuthRoutes,
            registerLaureateDetailsRoutes,
        ].forEach((registerRoutes) => registerRoutes(server));
    });
});
