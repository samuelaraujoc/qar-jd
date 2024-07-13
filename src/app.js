const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('../mongoose'); // Conexão com o MongoDB
const dadosRouter = require('./routes/dados');
const dados2Router = require('./routes/dados2');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/dados', dadosRouter);
app.use('/dados2', dados2Router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

module.exports = app;
