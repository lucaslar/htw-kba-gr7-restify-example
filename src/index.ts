import restify from 'restify';

const [host, port] = ['0.0.0.0', 8080];
const server = restify.createServer();

server.listen(port, host, () => {
    console.log('Running on:', server.address());

    server.get('/', (req, res, next) => {
        res.send({ message: 'Hello World!' });
        next();
    });
});
