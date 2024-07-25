const express = require('express');
const router = express.Router();
const DadoQualidadeAr = require('../models/dadoQualidadeAr');

// Endpoint para buscar dados com base em mês
router.get('/', async (req, res) => {
    try {
        const { singleDate2, moqaID } = req.query;
        const match = {};

        if (singleDate2) {
            const [year, month] = singleDate2.split('-').map(Number);
            const startTimestamp = new Date(Date.UTC(year, month - 1, 1)).getTime() / 1000;
            const endTimestamp = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)).getTime() / 1000;
            match.Timestamp = {
                $gte: startTimestamp,
                $lte: endTimestamp
            };
        }

        if (moqaID) {
            match.moqaID = moqaID;
        }

        // Agregação para calcular a média diária
        const dados = await DadoQualidadeAr.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        year: { $year: { $toDate: { $multiply: ["$Timestamp", 1000] } } },
                        month: { $month: { $toDate: { $multiply: ["$Timestamp", 1000] } } },
                        day: { $dayOfMonth: { $toDate: { $multiply: ["$Timestamp", 1000] } } }
                    },
                    avgPM25: { $avg: "$pm25" },
                    avgPM10: { $avg: "$pm10" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: {
                                $dateFromParts: {
                                    year: "$_id.year",
                                    month: "$_id.month",
                                    day: "$_id.day"
                                }
                            }
                        }
                    },
                    avgPM25: { $round: ["$avgPM25", 1] },
                    avgPM10: { $round: ["$avgPM10", 1] },
                    count: 1
                }
            },
            { $sort: { date: 1 } }
        ]);

        res.json({ documents: dados });
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

module.exports = router;
