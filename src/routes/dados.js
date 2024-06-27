const express = require('express');
const router = express.Router();
const DadoQualidadeAr = require('../models/dadoQualidadeAr');

// Endpoint para buscar dados com base em data
router.get('/', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const query = {};

        if (startDate && endDate) {
            query.Timestamp = {
                $gte: Math.floor(new Date(startDate).getTime() / 1000),
                $lte: Math.floor(new Date(endDate).getTime() / 1000)
            };
        }

        const dados = await DadoQualidadeAr.find(query);
        res.json(dados);
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

router.get('/moqaIDs', async (req, res) => {
    try {
        const moqaIDs = await DadoQualidadeAr.distinct('moqaID');
        res.json(moqaIDs);
    } catch (error) {
        res.status(500).send('Erro ao buscar moqaIDs: ' + error.message);
    }
});

module.exports = router;
