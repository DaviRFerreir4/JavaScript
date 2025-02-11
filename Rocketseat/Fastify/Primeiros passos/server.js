import { createServer } from 'node:http'

const server = createServer((request, response) => {
    console.log("Hello World!");

    response.write("Hello World!");
    return response.end();
})

server.listen(3333);