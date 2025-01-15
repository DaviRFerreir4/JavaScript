import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';

const server = fastify();
const database = new DatabaseMemory();

server.post('/video', (request, reply) => {
    database.create({
        title: "Tutorial de Node.js",
        description: "Hoje vamos aprender mais sobre Node.js",
        duration: 180
    });

    console.log(database.list());

    return reply.status(201).send();
});

server.get('/video', () => {
    return 'asd';
});

server.put('/video/:id', () => {
    return '';
});

server.delete('/video/:id', () => {
    return '';
});

server.get('/', async (req, res) => {
    res.redirect("./video");
});

server.listen({
    port: 3333,
});