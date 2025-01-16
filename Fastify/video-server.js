import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';

const server = fastify();
const database = new DatabaseMemory();

server.post('/video', (request, reply) => {
    const {title, description, duration} = request.body;

    database.create({
        title,
        description,
        duration
    });

    //console.log(database.list());

    return reply.status(201).send();
});

server.get('/video', (request, reply) => {
    const search = request.query.search;

    //console.log(search);

    const videos = database.list(search);

    return videos;
});

server.put('/video/:id', (request, reply) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;

    database.update(videoId, {
        title,
        description,
        duration
    });

    return reply.status(204).send();
});

server.delete('/video/:id', (request, reply) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return reply.status(204).send();
});

server.get('/', async (req, res) => {
    res.redirect("./video");
});

server.listen({
    port: 3333,
});