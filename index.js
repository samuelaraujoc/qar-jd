const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./mongoose'); // Importando o mongoose.js

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importar e usar rotas
const dadosRouter = require('./src/routes/dados');
app.use('/dados', dadosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
