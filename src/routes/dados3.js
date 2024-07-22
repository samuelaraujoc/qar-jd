const express = require('express');
const router = express.Router();
const DadoQualidadeAr = require('../models/dadoQualidadeAr');

// Endpoint para buscar dados com base em intervalo de datas
router.get('/', async (req, res) => {
    try {
        const { startDate, endDate, moqaID } = req.query;
        const match = {};

        if (startDate && endDate) {
            const startTimestamp = new Date(startDate).getTime() / 1000;
            const endTimestamp = new Date(endDate).getTime() / 1000;
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
                    avgPM10: { $avg: "$pm10" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Timestamp: {
                        $dateToString: {
                            format: "%Y-%m-%dT00:00:00Z",
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
                    avgPM10: { $round: ["$avgPM10", 1] }
                }
            },
            { $sort: { Timestamp: 1 } }
        ]);

        const count = dados.length;

        res.json({ count: count, documents: dados });
    } catch (error) {
        res.status(500).send('Erro ao buscar dados: ' + error.message);
    }
});

module.exports = router;
