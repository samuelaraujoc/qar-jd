const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Substitua 'YourModel' pelo modelo correto do MongoDB
const YourModel = mongoose.model('YourModel', new mongoose.Schema({}, { strict: false }));

router.get('/dados-anuais', async (req, res) => {
    const year = req.query.year || new Date().getFullYear(); // Pega o ano atual se nenhum ano for especificado

    try {
        const startDate = new Date(`${year}-01-01T00:00:00Z`);
        const endDate = new Date(`${year}-12-31T23:59:59Z`);

        const data = await YourModel.aggregate([
            {
                $match: {
                    Timestamp: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$Timestamp" },
                        dayOfYear: { $dayOfYear: "$Timestamp" }
                    },
                    avgPM25: { $avg: "$avgPM25" }
                }
            },
            {
                $sort: { "_id.dayOfYear": 1 }
            }
        ]);

        res.json({ documents: data });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).send('Erro ao buscar dados');
    }
});

module.exports = router;
