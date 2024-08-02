const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('../mongoose'); // Conexão com o MongoDB
const dadosRouter = require('./routes/dados');
const dadosRouterMapa = require('./routes/dadosMapa');
const dados2Router = require('./routes/dados2');
const dados3Router = require('./routes/dados3');


const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/dadosMapa', dadosRouterMapa);
app.use('/dados', dadosRouter);
app.use('/dados2', dados2Router);
app.use('/dados3', dados3Router);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

module.exports = app;
