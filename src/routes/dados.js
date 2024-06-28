const express = require('express');
const router = express.Router();
const DadoQualidadeAr = require('../models/dadoQualidadeAr');

// Endpoint existente para buscar dados com base em data
router.get('/', async (req, res) => {
    try {
        const { startDate, endDate, moqaID } = req.query;
        const query = {};

        if (startDate && endDate) {
            query.Timestamp = {
                $gte: new Date(startDate).getTime() / 1000,
                $lte: new Date(endDate).getTime() / 1000
            };
        }

        if (moqaID) {
            query.moqaID = moqaID;
        }
    
        //Count é um contador que acrescentei para ver o numeros de Json retornando no Postman, para futuros teste.
        const dados = await DadoQualidadeAr.find(query);
        const count = dados.length;

        res.json({ count: count, documents: dados });
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

module.exports = router;
