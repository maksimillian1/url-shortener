const express = require('express');

const server = express();

const PORT = '3000';

server.listen(PORT);


server.get('/', (req, res) => {
    res.send('Hello');
});