const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('../mongoose'); // Conexão com o MongoDB
const dadosRouter = require('./routes/dados');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/dados', dadosRouter);

module.exports = app;
