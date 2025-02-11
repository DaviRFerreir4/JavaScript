import { fastify } from 'fastify';

const server = fastify();

server.get('/', () => {
    return "Hello World!";
});

server.get('/hello', () => {
    return "World!";
});

server.get('/framework', () => {
    return "Fastify";
});

server.listen({
    port: 3333,
});