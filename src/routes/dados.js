const express = require('express');
const router = express.Router();
const DadoQualidadeAr = require('../models/dadoQualidadeAr');

// Endpoint existente para buscar dados com base em data
router.get('/', async (req, res) => {
    try {
        const { singleDate, moqaID } = req.query;
        const query = {};

        if (singleDate) {
            const startTimestamp = new Date(singleDate).setHours(0, 0, 0, 0) / 1000;
            const endTimestamp = new Date(singleDate).setHours(23, 59, 59, 999) / 1000;
            query.Timestamp = {
                $gte: startTimestamp,
                $lte: endTimestamp
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
