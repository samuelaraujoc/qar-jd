const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Substitua 'YourModel' pelo modelo correto do MongoDB
const YourModel = mongoose.model('YourModel', new mongoose.Schema({}, { strict: false }));

router.get('/dados-intervalo', async (req, res) => {
    const { startDate, endDate, monitor, pollutant } = req.query;

    try {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const data = await YourModel.aggregate([
            {
                $match: {
                    Timestamp: { $gte: start, $lte: end },
                    monitor: monitor
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$Timestamp" } },
                    avgValue: { $avg: `$${pollutant}` }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]);

        res.json({ documents: data });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

module.exports = router;
