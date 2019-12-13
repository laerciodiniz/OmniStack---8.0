const express = require('express');
const mongoose = require('mongoose');

const { DATABASE_URL } = require('./config/security');

const routes = require('./routes');

const server = express();

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

server.use(express.json());
server.use(routes);

server.listen(3333);