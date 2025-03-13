console.clear();

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

import { connect } from './db.js';

connect();

import express from 'express';

const server = express();

server.get("/", (req, res) => {
    res.send("Eae");
})

server.listen(port);