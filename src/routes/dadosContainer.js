const express = require('express');
const router = express.Router();
const DadoQualidadeAr = require('../models/dadoQualidadeAr');

router.get('/:moqaID', async (req, res) => {
    try {
        const { moqaID } = req.params;
        
        const data = await DadoQualidadeAr.find({ moqaID }).sort({ Timestamp: -1 }).limit(1);
        
        if (!data.length) {
            return res.status(404).json({ error: 'Dados não encontrados para o monitor especificado.' });
        }

        const latestData = data[0];
        const formattedPM25 = parseFloat(latestData.pm25).toFixed(1);
        res.json({ latestPM25: formattedPM25 });
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

module.exports = router;
